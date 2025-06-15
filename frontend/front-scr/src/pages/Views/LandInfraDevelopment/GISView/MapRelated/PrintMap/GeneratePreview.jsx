export const GeneratePreviewFirst=(title,previewUrl)=>{
    return `
          <html>
            <head>
              <title>${title}</title>
              <style>
                body { margin: 0; }
                img { width: 100%; height: 100%; }
                .title {
                  position: absolute;
                  top: 10px;
                  left: 50%;
                  transform: translateX(-50%);
                  font-size: 24px;
                  font-weight: bold;
                  background: rgba(255, 255, 255, 0.8);
                  padding: 5px 10px;
                  border-radius: 5px;
                }
              </style>
            </head>
            <body>
              <div class="title">${title}</div>
              <img src="${previewUrl}" alt="Map Preview" />
            </body>
          </html>
        `;
}
export const GeneratePreview=(title,previewUrl)=>{
    return `
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { margin: 0; }
              img { width: 100%; height: auto; }
            </style>
          </head>
          <body>
            <img src="${previewUrl}" alt="Map Preview" />
          </body>
        </html>
      `;
}