const { nuke } = document.all;

nuke.onclick = async () => {
  nuke.disabled = true;
  nuke.textContent = "Nuking...";
  const reg = await navigator.serviceWorker.getRegistration();
  if (reg) {
    await reg.unregister();
  }
  for (const cache of await caches.keys()) {
    await caches.delete(cache);
  }
  nuke.textContent = "Done.";
};
