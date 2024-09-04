{
  // Función para crear nodos en el árbol AST
  const  crearNodo = (tipoNodo, props) => {
    const tipos = {
      'agrupacion': nodos.Agrupacion,
      'binaria': nodos.OperacionBinaria,
      'unaria': nodos.OperacionUnaria,
      'declaracionVariable': nodos.DeclaracionVariable,
      'referenciaVariable': nodos.ReferenciaVariable,
      'tipoVariable': nodos.TipoVariable,
      'print': nodos.Print,
      'expresionStmt': nodos.ExpresionStmt,
      'asignacion': nodos.Asignacion,
      'bloque': nodos.Bloque,
      'if': nodos.If,
      'while': nodos.While,
      'for': nodos.For,
      'incremento': nodos.Incremento,
      'decremento': nodos.Decremento,
      'primitivo': nodos.Primitivo,
      'ternario': nodos.Ternario,
      'switch': nodos.Switch,
      'break': nodos.Break,
      'continue': nodos.Continue,
      'return': nodos.Return,
      'arreglo': nodos.Arreglo,
      'arregloVal': nodos.ArregloVal,
      'copiarArreglo': nodos.CopiarArreglo,
      'arrregloVacio': nodos.ArregloVacio,
      'asignacionArreglo': nodos.AsignacionArreglo
    };

    const nodo = new tipos[tipoNodo](props);
    nodo.location = location();
    return nodo;
  }
}

programa = _ dcl:Declaracion* _ { return dcl }

Declaracion = dcl:VarDcl _ { return dcl }
            / stmt:Stmt _ { return stmt }
            / arreglo:Arreglo _ { return arreglo }

VarDcl = tipo:TipoDato _ id:Identificador _ exp:("=" _ exp:Expresion _ {return exp})?";" { return crearNodo('tipoVariable', { tipo, id, exp }) }
        / "var" _ id:Identificador _ "=" _ exp:Expresion ";" { return crearNodo('declaracionVariable', { id, exp }) }
TipoDato = "int" / "float" / "string" / "boolean" / "char"

Stmt = "System.out.println(" _ exp:Expresion _ exps: (","_ exps: Expresion {return exps})* ")" _ ";" { return crearNodo('print', { exp, exps }) }
    / "{" _ decl:Declaracion*  "}" { return crearNodo('bloque', { decl }) }
    / "if" _ "(" _ cond:Expresion _ ")" _ stmtT:Stmt 
    stmtElse:( 
      _ "else" _ stmtElse:Stmt { return stmtElse }
    )? { return crearNodo('if', { cond, stmtT, stmtElse }) }
    / "while" _ "(" _ cond:Expresion _ ")" _ stmt:Stmt { return crearNodo('while', { cond, stmt }) }
    / "for" _ "(" _ inic: ForInic _ cond: Expresion _ ";" _ incremento: Expresion _ ")" _ stmt:Stmt {
      return crearNodo('for', { inic, cond, incremento, stmt })
    }
    / "switch" _ "(" _ exp:Expresion _ ")" _ "{" _ cases:Cases* _ defa:Defaul? _ "}" { return crearNodo('switch', { exp, cases, defa }) }
    / "break" _ ";" { return crearNodo('break') }
    / "continue" _ ";" { return crearNodo('continue') }
    / "return" _ exp:Expresion? _ ";" { return crearNodo('return', { exp }) }
    / exp:Expresion _ ";" { return crearNodo('expresionStmt', { exp }) }

ForInic = dc:VarDcl { return dc }
        / exp:Expresion _ ";" { return exp }
        / ";" { return null }

Cases = "case" _ exp:Expresion _ ":" _ stmt:( _ stmt:Stmt _ {return stmt})* _ { return { exp, stmt } }
Defaul = "default" _ ":" _ stmt:(_ stmt: Stmt _ {return stmt})*_ { return stmt  }

Arreglo = tipo:TipoDato _ "[" _ "]" _ id:Identificador _ "=" _ id2: Identificador _ ";" {return crearNodo('copiarArreglo', {tipo,id, exp:crearNodo('referenciaVariable', {id:id2, pos:[]})})}
          / tipo:TipoDato _ tmn:( "[" _  vl1:"]" _ vl2:(_ "[" _ v:"]" {return v})* {return [vl1, ...vl2]}) _ id:Identificador _ "=" _ valores:Expresion _ ";" {return crearNodo('arregloVal', {tipo, id, tmn, valores})}
          / tipo1:TipoDato _ tmn:( "[" _  vl1:"]" _ vl2:(_ "[" _ v:"]" {return v})* {return [vl1, ...vl2]}) _ id:Identificador _ "=" _ "new" _ tipo2:TipoDato _ tamanos:("[" _ vl1:Expresion _ "]" _ vl2:( _ "[" _ v:Expresion _ "]" {return v})* {return [vl1, ...vl2] }) _ ";" {return crearNodo('arrregloVacio',{tipo1, tmn, id, tipo2, tamanos})}

Identificador = [a-zA-Z][a-zA-Z0-9]* { return text() }

Expresion = Asignacion

Asignacion = id:Identificador _ pos:("[" _ val:Expresion _ "]"_ val2:( _ "[" _ v:Expresion _ "]" {return v})* {return [val, ...val2]}) _ "=" _ asg:Expresion {return crearNodo('asignacionArreglo',{id, pos, asg})}
            / id:Identificador _ "=" _ exp:Asignacion _ { return crearNodo('asignacion', { id, exp }) }
            / id:Identificador _ "+=" _ exp: Expresion _ {return crearNodo('asignacion' ,{id, exp: crearNodo('binaria', {op:"+=",izq: crearNodo('referenciaVariable',{id, pos:[]}),der:exp}) })}
            / id:Identificador _ "-=" _ exp: Expresion _ {return crearNodo('asignacion' ,{id, exp: crearNodo('binaria', {op:"-=",izq: crearNodo('referenciaVariable',{id,pos:[]}),der:exp}) })}
            / Ternario
            / Logico

Ternario = condi:Logico _ "?" _ exp1:Logico _ ":" _ exp2:Logico { return crearNodo('ternario', { condi, exp1, exp2 }) }

Logico = izq:Igualacion expansion:(
          _ op:("&&" / "||") _ der:Igualacion { return { tipo: op, der } }
        )* {
          return expansion.reduce(
            (operacionAnterior, operacionActual) => {
              const { tipo, der } = operacionActual
              return crearNodo('binaria', { op: tipo, izq: operacionAnterior, der })
            },
            izq
          )
        }

Igualacion = izq:Comparacion expansion:(
              _ op:("!=" / "==") _ der:Comparacion { return { tipo: op, der } }
            )* {
              return expansion.reduce(
                (operacionAnterior, operacionActual) => {
                  const { tipo, der } = operacionActual
                  return crearNodo('binaria', { op: tipo, izq: operacionAnterior, der })
                },
                izq
              )
            }

Comparacion = izq:Suma expansion:(
              _ op:("<=" / "<" / ">=" / ">") _ der:Suma { return { tipo: op, der } }
            )* {
              return expansion.reduce(
                (operacionAnterior, operacionActual) => {
                  const { tipo, der } = operacionActual
                  return crearNodo('binaria', { op: tipo, izq: operacionAnterior, der })
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
      return crearNodo('binaria', { op: tipo, izq: operacionAnterior, der })
    },
    izq
  )
}

Multiplicacion = izq:Unaria expansion:(
  _ op:("*" / "/"/"%") _ der:Unaria { return { tipo: op, der } }
)* {
    return expansion.reduce(
      (operacionAnterior, operacionActual) => {
        const { tipo, der } = operacionActual
        return crearNodo('binaria', { op: tipo, izq: operacionAnterior, der })
      },
      izq
    )
}

Unaria = "toString(" _ exp:Expresion _ ")" { return crearNodo('unaria', {op: 'toString', exp }) }
          / "toUpperCase(" _ exp:Expresion _ ")" { return crearNodo('unaria', {op: 'toUpperCase', exp }) }
          / "toLowerCase(" _ exp:Expresion _ ")" { return crearNodo('unaria', {op: 'toLowerCase', exp }) }
          / "parseInt(" _ exp:Expresion _ ")" { return crearNodo('unaria', {op: 'parseInt', exp }) }
          / "parseFloat(" _ exp:Expresion _ ")" { return crearNodo('unaria', {op: 'parseFloat', exp }) }
          / "typeof" _ exp:Expresion _ { return crearNodo('unaria', {op: 'typeof', exp }) }
          / "-" _ num:Unaria { return crearNodo('unaria', { op: '-', exp: num }) }
          / "!" _ exp:Unaria { return crearNodo('unaria', { op: '!', exp }) }
          / id:Identificador "++" { return crearNodo('incremento', { id }) }
          / id:Identificador "--" { return crearNodo('decremento', { id }) }
          / id: Identificador _ pos:("[" _ val:Expresion _ "]"_ val2:( _ "[" _ v:Expresion _ "]" {return v})* {return [val, ...val2]}) {return crearNodo('referenciaVariable', {id, pos}) }
          / Primitivos

Primitivos = [0-9]+( "." [0-9]+ )? { return text().includes('.') ? crearNodo('primitivo', { valor: parseFloat(text(), 10), tipo:"float"}) : crearNodo('primitivo', { valor: parseInt(text(), 10), tipo:"int"})	 }
    / bool:("true"/"false") { return bool == "true" ? crearNodo('primitivo', { valor: true, tipo: 'boolean' }) : crearNodo('primitivo', { valor: false, tipo: 'boolean' }) }
    / "'" char:[^'] "'" { return crearNodo('primitivo', { valor: char, tipo: 'char' }) }
    / Cadena
    / "(" exp:Expresion ")" { return crearNodo('agrupacion', { exp })}
    / "{" _ exp1:Expresion _ vls:("," _ exp:Expresion _ {return exp})* _ "}" { return crearNodo('arreglo',{vls: [exp1, ...vls]} ) }
    / id: Identificador { return crearNodo('referenciaVariable', { id, pos:[] }) }

Cadena = "\"" contenido:[^"]* "\""{ var text = contenido.join(""); 
            text = text.replace(/\\n/g, "\n");
            text = text.replace(/\\\\/g, "\\");
            text = text.replace(/\\\"/g,"\"");
            text = text.replace(/\\r/g, "\r");
            text = text.replace(/\\t/g, "\t");
            text = text.replace(/\\\'/g, "'");
            return crearNodo('primitivo', {valor: text, tipo:'string'});}

_ = (Comentario / [ \t\n\r])*

Comentario = "//"[^\n]*{ }
            / "/*" (!"*/" .)* "*/" { }
