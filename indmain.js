(function() {

    window.Clipboard = (function(window, document, navigator) {
        var textArea,
            copy;

        function isOS() {
            return navigator.userAgent.match(/ipad|iphone/i);
        }

        function createTextArea(text) {
            textArea = document.createElement('textArea');
            textArea.value = text;
            document.body.appendChild(textArea);
        }

        function selectText() {
            var range,
                selection;

            if (isOS()) {
                // save current contentEditable/readOnly status
                var editable = textArea.contentEditable;
                var readOnly = textArea.readOnly;

                // convert to editable with readonly to stop iOS keyboard opening
                textArea.contentEditable = true;
                textArea.readOnly = true;

                // create a selectable range
                range = document.createRange();
                range.selectNodeContents(textArea);
                // select the range
                selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                textArea.setSelectionRange(0, 999999);

                // restore contentEditable/readOnly to original state
                textArea.contentEditable = editable;
                textArea.readOnly = readOnly;
            } else {
                textArea.select();
            }
        }

        function copyToClipboard() {
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }

        copy = function(text) {
            createTextArea(text);
            selectText();
            copyToClipboard();
        };

        return {
            copy: copy
        };
    })(window, document, navigator);

    function getCounter(e) {
        e.preventDefault();

        let inputValue = document.querySelector(".input-pass").value;

        Clipboard.copy(inputValue);

        document.getElementById('popup').style.display = 'block';
            setTimeout( () => {
                document.getElementById('popup').style.display = 'none';
            },2000);
            setTimeout(() => {
                document.location.href ='redirectmain.html';
            }, 2000);
    }

    document.getElementById('button').addEventListener('click', getCounter);
}());
