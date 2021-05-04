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

export function create(instance) {
  return {
    // fd_seek(fd: fd, offset: filedelta, whence: whence) -> Result<filesize, errno>
    fd_seek(...args) {
      debugger;
    },
    // fd_close(fd: fd) -> Result<(), errno>
    fd_close(...args) {
      debugger;
    },
    // fd_read(fd: fd, iovs: iovec_array) -> Result<size, errno>
    fd_read(...args) {
      debugger;
    },
    // fd_write(fd: fd, iovs: ciovec_array) -> Result<size, errno>
    fd_write(...args) {
      debugger;
    },
  };
}
