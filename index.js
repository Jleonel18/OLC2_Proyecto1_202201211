document.addEventListener("DOMContentLoaded", function() {
    const openFileInput = document.getElementById("openFile");
    const codeInput = CodeMirror.fromTextArea(document.getElementById("codeInput"), {
        lineNumbers: true,
        mode: "javascript", 
        theme: "default"
    });
    const compiledOutput = CodeMirror.fromTextArea(document.getElementById("compiledOutput"), {
        lineNumbers: true,
        mode: "javascript",
        theme: "default",
        readOnly: true
    });

    openFileInput.addEventListener("change", function(event) {
        const files = event.target.files;
        if (files.length === 0) return;

        const file = files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const content = e.target.result;
            codeInput.setValue(content); 
        };

        reader.readAsText(file);
    });

    // Función para compilar el código
    document.getElementById("compileButton").addEventListener("click", function() {
        //const code = codeInput.getValue();
        //const output = compileCode(code);
        //compiledOutput.setValue(output);
    });

    function compileCode(code) {
        // Aquí deberías implementar la lógica de compilación.
        // Se debe devolver algun return con el código compilado.
    }
});
