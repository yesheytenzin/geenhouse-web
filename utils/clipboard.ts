async function copyToClipboard(content: string) {
  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch (err) {
    console.log(err);
  }
}
export default copyToClipboard;
