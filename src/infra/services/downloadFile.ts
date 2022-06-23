export const downloadFile = (url: string, type: string) => {
  console.log(type);
  fetch(url, {
    method: "GET",
    headers: {
      //   "Content-Type": "application/pdf",
      "Content-Type": type,
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `FileName.pdf`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      //@ts-ignore
      link.parentNode.removeChild(link);
    });
};
