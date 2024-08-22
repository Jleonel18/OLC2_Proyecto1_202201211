
{
  const crearNodo = (tipoNodo, props) =>{
    const tipos = {
      'numero': nodos.Numero,
      'agrupacion': nodos.Agrupacion,
      'binaria': nodos.OperacionBinaria,
      'unaria': nodos.OperacionUnaria,
      'declaracionVariable': nodos.DeclaracionVariable,
      'referenciaVariable': nodos.ReferenciaVariable,
      'print': nodos.Print,
      'expresionStmt': nodos.ExpresionStmt,
      'asignacion': nodos.Asignacion,
      'bloque': nodos.Bloque,
      'if': nodos.If,
      'while': nodos.While,
      'for': nodos.For,
      'incremento': nodos.Incremento,
      'decremento': nodos.Decremento,
      'cadena': nodos.Cadena,
      'caracter': nodos.Caracter,
      'booleano': nodos.Booleano
    }

    const nodo = new tipos[tipoNodo](props)
    nodo.location = location()
    return nodo
  }
}

programa = _ dcl:Declaracion* _ { return dcl }

Declaracion = dcl:VarDcl _ { return dcl }
            / stmt:Stmt _ { return stmt }

VarDcl = tipo:TipoDato _ id:Identificador _ "=" _ exp:Expresion _ ";" { return crearNodo('declaracionVariable', { tipo,id, exp }) }

TipoDato = "int" / "float" / "string" / "bool" / "var" / "char"

Stmt = "print(" _ exp:Expresion _ ")" _ ";" { return crearNodo('print', { exp }) }
    / exp:Expresion _ ";" { return crearNodo('expresionStmt', { exp }) }
    / "{" _ decl:Declaracion*  "}" { return crearNodo('bloque', {decl}) }
    / "if" _ "(" _ cond:Expresion _ ")" _ stmtT:Stmt 
    stmtElse:( 
      _ "else" _ stmtElse:Stmt {return stmtElse}
    )? { return crearNodo('if', { cond, stmtT, stmtElse }) }

    / "while" _ "(" _ cond:Expresion _ ")" _ stmt:Stmt { return crearNodo('while', { cond, stmt }) }
    / "for" _ "(" _ inic: Declaracion _ cond: Expresion _ ";" _ incremento: Expresion _ ")" _ stmt:Stmt { return crearNodo('for', { inic, cond, incremento, stmt }) }

Identificador = [a-zA-Z][a-zA-Z0-9]* { return text() }

Expresion = Asignacion

Asignacion = id:Identificador _ "=" _ exp:Asignacion _ { return crearNodo('asignacion', { id, exp }) }
          / Comparacion

Comparacion = izq:Suma expansion:(
              _ op:("<="/"<"/">="/">") _ der:Suma { return { tipo: op, der } }
            )* {
              return expansion.reduce(
                (operacionAnterior, operacionActual) => {
                  const { tipo, der } = operacionActual
                  return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
                },
                izq
              )
            }

Suma = izq:Multiplicacion expansion:(
  _ op:("+" / "-") _ der:Multiplicacion { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
    },
    izq
  )
}

Multiplicacion = izq:Unaria expansion:(
  _ op:("*" / "/") _ der:Unaria { return { tipo: op, der } }
)* {
    return expansion.reduce(
      (operacionAnterior, operacionActual) => {
        const { tipo, der } = operacionActual
        return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
      },
      izq
    )
}

Unaria = "-" _ num:Numero { return crearNodo('unaria', { op: '-', exp: num }) }
          / Booleano
          / Cadena
          / Caracter
          / id:Identificador"++" { return crearNodo('incremento', {id}) }
          / id:Identificador"--" { return crearNodo('decremento', {id}) }
          / Numero


Booleano = "true" { return crearNodo('booleano', { valor: true }) }
          / "false" { return crearNodo('booleano', { valor: false }) }

Cadena = "\"" chars:([^"]*) "\"" { return crearNodo('cadena', { valor: chars.join("") }) }
Caracter = "'" char:[^'] "'" { return crearNodo('caracter', { valor: char }) }

Numero = [0-9]+( "." [0-9]+ )? {return crearNodo('numero', { valor: parseFloat(text(), 10) })}
  / "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }) }
  / id:Identificador { return crearNodo('referenciaVariable', { id }) }


_ = [ \t\n\r]*