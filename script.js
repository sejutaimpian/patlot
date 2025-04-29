document.addEventListener("alpine:init", () => {
  Alpine.data("codeEditor", function () {
    return {
      init() {
        this.render();
        this.$watch("html", () => this.render());
        this.$watch("css", () => this.render());
        this.$watch("js", () => this.render());
      },
      html: this.$persist(
        '<h1>Hello World</h1>\n<button onclick="sayHello()">Click Me</button>'
      ),
      css: this.$persist("h1 {\n\tcolor: red;\n}"),
      js: this.$persist("function sayHello() {\n\talert('Hello World');\n}"),
      widthDocument: 0,
      activeTextarea: this.$persist("html"),
      get isInMobile() {
        return window.matchMedia("(width < 48rem)").matches;
      },
      setActiveTextarea(textarea) {
        this.activeTextarea = textarea;
      },
      printClassTextarea(textarea) {
        return this.activeTextarea === textarea && "active";
      },
      printClassLabel(textarea) {
        return this.activeTextarea === textarea && "active";
      },
      render() {
        const fullCode = `
                <html>
                  <head>
                    <!-- <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script> -->
                    <style>${this.css}</style>
                  </head>
                  <body>
                    ${this.html}
                    <script>${this.js}</script>
                  </body>
                </html>
              `;
        output.srcdoc = fullCode;
      },

      // Tab Feature
      tab() {
        const el = this.$el;
        const start = el.selectionStart;
        const end = el.selectionEnd;

        el.value = el.value.slice(0, start) + "\t" + el.value.slice(end);
        el.selectionStart = el.selectionEnd = start + 1;
      },

      // Resize Feature
      isResizing: false,
      startX: 0,
      startWidth: 0,
      handleMouseDown(e) {
        this.isResizing = true;
        this.startX = e.clientX;
        const el = document.getElementById("html");
        const leftWidthNow = el.offsetWidth;
        this.startWidth = leftWidthNow;
        // this.startWidth = parseInt(leftWidthNow, 10) || 0;
      },
      resize(e) {
        if (!this.isResizing) return;
        const newWidth = this.startWidth + (e.clientX - this.startX);
        codeEditor.style.setProperty("--left-width", newWidth + "px");
      },
    };
  });
});
