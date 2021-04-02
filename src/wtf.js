/**
 * Copyright 2021 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
