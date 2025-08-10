async function shortenUrl() {
  const originalUrl = document.getElementById('longUrl').value;

  if (!originalUrl) {
    alert("Please enter a URL.");
    return;
  }

  const response = await fetch('http://localhost:5000/api/url/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ originalUrl })
  });

  const data = await response.json();

  const resultDiv = document.getElementById('result');
  if (data.shortUrl) {
    resultDiv.innerHTML = `
      Short URL: 
      <a href="${data.shortUrl}" target="_blank" id="shortUrl">${data.shortUrl}</a>
      <button id="copyBtn">Copy Link</button>
    `;

    // Add event listener to copy button
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.addEventListener('click', () => {
      const shortUrlText = document.getElementById('shortUrl').textContent;
      navigator.clipboard.writeText(shortUrlText).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy Link';
        }, 2000);
      }).catch(() => {
        alert('Failed to copy the link.');
      });
    });

  } else {
    resultDiv.innerText = 'Error: ' + (data.message || 'Something went wrong');
  }
}
