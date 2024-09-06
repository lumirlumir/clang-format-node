# clang-format-node

[![lint](https://github.com/lumirlumir/npm-clang-format-node/actions/workflows/lint.yml/badge.svg)](https://github.com/lumirlumir/npm-clang-format-node/actions/workflows/lint.yml)
[![test](https://github.com/lumirlumir/npm-clang-format-node/actions/workflows/test.yml/badge.svg)](https://github.com/lumirlumir/npm-clang-format-node/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/lumirlumir/npm-clang-format-node/graph/badge.svg?token=69BF05THA2)](https://codecov.io/gh/lumirlumir/npm-clang-format-node)
[![NPM Version](https://img.shields.io/npm/v/clang-format-node)](https://www.npmjs.com/package/clang-format-node)
![GitHub Release](https://img.shields.io/github/v/release/lumirlumir/npm-clang-format-node?label=release(LLVM%20version)&color=violet)

Node repackaging(wrapping) of the `clang-format` native binary inspired by ['angular/clang-format'](https://github.com/angular/clang-format).🐉

This package intends to release a new npm package for every **latest** release of the `clang-format`. It **checks** for the latest LLVM release every week, builds `clang-format` using its own pipeline, and makes a **pull request**. All processes are run automatically. If you are interested in build process, take a look at [`.github/workflows/llvm-build-bump-pr.yml`](/.github/workflows/llvm-build-bump-pr.yml)

## Why I started this project

['angular/clang-format'](https://github.com/angular/clang-format) is no longer maintained. (See [#79](https://github.com/angular/clang-format/issues/79) [#82](https://github.com/angular/clang-format/issues/82) [#83](https://github.com/angular/clang-format/pull/83)) Nevertheless, new versions of `clang-format` continue to be released. Bugs are fixed, and new features are added. However, using `clang-format` directly in a Node.js environment without any support can be somewhat cumbersome. So I decided to make a **new**, **maintained** one.

Note that some feautures from 'angular/clang-format' are not included in this package. Specifically `check-clang-format` and `git-clang-format` are not used. There are a few reasons for this. Both commands **rely on Python**, so if you haven't installed Python, they cannot be executed. Many people would prefer if this package worked without dependencies beyond Node.js. **So, this package relies only on Node.js.** See the [Migration](#migration-from-angularclang-format) for alternative methods to `check-clang-format` and `git-clang-format`.

## Supported OS platforms and architectures

It supports **ALL** [**Tier1**](https://github.com/nodejs/node/blob/main/BUILDING.md#strategy) and some [**Tier2**](https://github.com/nodejs/node/blob/main/BUILDING.md#strategy) platforms of Node.js. *Note that the functionality cannot be guaranteed on platforms which is not mentioned below*.

(To see the full list of platforms supported by Node.js, click [here](<https://github.com/nodejs/node/blob/main/BUILDING.md#platform-list>).)

<br> | Operating System | Architectures    | Versions                          | Support Type |
---- | ---------------- | ---------------- | --------------------------------- | ------------ |
1    | macOS            | arm64            | >= 11.0                           | Tier 1       |
2    | macOS            | x64              | >= 11.0                           | Tier 1       |
3    | GNU/Linux        | armv7            | kernel >= 4.18, glibc >= 2.28     | Tier 1       |
4    | GNU/Linux        | arm64            | kernel >= 4.18, glibc >= 2.28     | Tier 1       |
5    | GNU/Linux        | ppc64le >=power8 | kernel >= 4.18, glibc >= 2.28     | Tier 2       |
6    | GNU/Linux        | s390x            | kernel >= 4.18, glibc >= 2.28     | Tier 2       |
7    | GNU/Linux        | x64              | kernel >= 4.18, glibc >= 2.28     | Tier 1       |
8    | Windows          | x64              | >= Windows 10/Server 2016         | Tier 1       |

> [!TIP]
>
> 1. If your platform isn't yet supported, you can build the `clang-format` native binary from the latest upstream clang sources. Refer to [`docs/llvm-build-linux.sh`](/docs/llvm-build-linux.sh) and [`docs/llvm-build-linux-x64.yml`](/docs/llvm-build-linux-x64.yml) for the Linux build scripts for **Shell** and **GitHub Actions**, respectively.
>
> 1. Or you can download `clang-format` native binary from [LLVM release assets](https://github.com/llvm/llvm-project/releases) that match your operating system platform and architecture like the lists below.
>
>     - `clang+llvm-18.1.7-aarch64-linux-gnu.tar.xz`
>     - `clang+llvm-18.1.7-armv7a-linux-gnueabihf.tar.gz`
>     - `clang+llvm-18.1.7-powerpc64-ibm-aix-7.2.tar.xz`
>     - `clang+llvm-18.1.7-x86_64-pc-windows-msvc.tar.xz`
>     - `and more...`

## Installation

### global

```bash
npm install -g clang-format-node
```

```bash
yarn global add clang-format-node
```

### local(devDependencies)

```bash
npm install --save-dev clang-format-node
```

```bash
yarn add --dev clang-format-node
```

## Usages

If you want to learn more about `clang-format` itself, see the [`clang-format style options`](https://clang.llvm.org/docs/ClangFormatStyleOptions.html).

> [!TIP]
>
> `clang-format` can take multiple files as arguments.
>
> ```bash
> npx clang-format -n -Werror file1.cpp file2.cpp src/file3.cpp
> ```

### Basic

#### Global

```bash
clang-format [options] [@<file>] [<file> ...]
```

#### Local

Use `npx` to run a locally installed package.

```bash
npx clang-format [options] [@<file>] [<file> ...]
```

#### Frequently used commands

1. `--version`: Check the version of `clang-format`.

    ``` bash
    npx clang-format --version
    ```

    Output example

    ```bash
    clang-format version 18.1.8 (https://github.com/llvm/llvm-project 3b5b5c1ec4a3095ab096dd780e84d7ab81f3d7ff)
    ```

    - `https://github.com/llvm/llvm-project`: Git repository URL for the LLVM project, which includes Clang.
    - `3b5b5c1ec4a3095ab096dd780e84d7ab81f3d7ff`: The commit hash of the Git repository where the source code for that version is stored. This hash allows you to precisely trace which source code version was used to generate `clang-format`.

1. `--help`: Help view additional options.

    ```bash
    npx clang-format --help
    ```

1. `--dry-run` or `-n`: Makes an **WARNING** when `example.cpp` is not correctly formatted.

    `--dry-run` and `-n` options are equivalent.

    ```bash
    npx clang-format --dry-run example.cpp
    ```

    ```bash
    npx clang-format -n example.cpp
    ```

1. `-Werror --dry-run` or `-Werror -n`: Makes an **ERROR** when `example.cpp` is not correctly formatted.

    > Similar to `eslint` or `prettier --check` commands.

    `--dry-run` and `-n` options are equivalent.

    ```bash
    npx clang-format -Werror --dry-run example.cpp
    ```

    ```bash
    npx clang-format -Werror -n example.cpp
    ```

1. `-i`: Automatically fix unformatted files.

    > Similar to `eslint --fix` or `prettier --write` commands.

    ```bash
    npx clang-format -i example.cpp
    ```

### Glob patterns

Unfortunately, there is no way to apply `clang-format` recursively. `*.cpp` will only match files in the current directory, not subdirectories. Even `**/*` doesn't work.

**So, you need to use the `find` command in Linux.** If you are a Windows user, use ***git bash***. then you can use the `find` command. The `find` command recursively searches through directories.

It is simple but can produce an error if the [**Argument list is too long**](https://stackoverflow.com/questions/11289551/argument-list-too-long-error-for-rm-cp-mv-commands). In that case, use `xargs`

#### Basic

To recursively search for all `.cpp` files in the current directory, use:

```bash
npx clang-format $(find . -name "*.cpp")
```

#### With regular expressions

To recursively search for all `.cpp` and `.h` files in the current directory using a regular expression, use:

```bash
npx clang-format $(find . -regex ".*\.\(cpp\|h\)")
```

#### With negation patterns

To exclude `excluded_file.cpp` from the `.cpp` files, use:

```bash
npx clang-format $(find . -name "*.cpp" ! -name "excluded_file.cpp")
```

### [`.clang-format-ignore`](https://clang.llvm.org/docs/ClangFormat.html#clang-format-ignore)

You can create `.clang-format-ignore` files to make `clang-format` ignore certain files. A `.clang-format-ignore` file consists of patterns of file path names. It has the following format:

- A blank line is skipped.
- Leading and trailing spaces of a line are trimmed.
- A line starting with a hash (`#`) is a comment.
- A non-comment line is a single pattern.
- The slash (`/`) is used as the directory separator.
- A pattern is relative to the directory of the `.clang-format-ignore` file (or the root directory if the pattern starts with a slash). Patterns containing drive names (e.g. `C:`) are not supported.
- Patterns follow the rules specified in [**POSIX 2.13.1, 2.13.2, and Rule 1 of 2.13.3.**](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html#tag_18_13)
- A pattern is negated if it starts with a bang (`!`).

To match all files in a directory, use e.g. `foo/bar/*`. To match all files in the directory of the `.clang-format-ignore` file, use `*`. Multiple `.clang-format-ignore` files are supported similar to the `.clang-format` files, with a lower directory level file voiding the higher level ones.

### Use with `husky` and `lint-staged`

Ensuring that changes to your code are properly formatted is an important part of your development workflow. Use `husky` and `lint-staged` for your continuous integration process.

#### `husky` (v8.x)

```bash
# .husky/pre-commit

npx lint-staged
```

#### `lint-staged` (v15.x)

1. Check

    ```jsonc
    /* package.json */

    {
      // ...
      "lint-staged": {
        "*.{c,cpp,h}": "npx clang-format -Werror -n",
      }
      // ...
    }
    ```

1. Fix

    ```jsonc
    /* package.json */

    {
      // ...
      "lint-staged": {
        "*.{c,cpp,h}": "npx clang-format -i",
      }
      // ...
    }
    ```

> [!TIP]
>
> If `example1.cpp` and `example2.c` are staged, then `npx clang-format -Werror -n example1.cpp example2.c` will be excuted.

## Migration from 'angular/clang-format'

### `check-clang-format`

This package only uses native `clang-format` features to check formatting. The following commands will produce an error if the target files are not correctly formatted. So use them with `husky` and `lint-staged`. (`--dry-run` and `-n` options are equivalent.)

```bash
npx clang-format -Werror --dry-run example.cpp
```

```bash
npx clang-format -Werror -n example.cpp
```

### `git-clang-format`

Use [`husky`](https://typicode.github.io/husky/) and [`lint-staged`](https://github.com/lint-staged/lint-staged) for the `pre-commit` hook instead. See [Use with `husky` and `lint-staged`](#use-with-husky-and-lint-staged) for details.

## Contributing

Thanks for having attention to this package.🙇‍♂️ Issues and PRs are always welcome.🎉

I recommend you to read the guides on [LLVM and clang-format mentioned in issues tab](https://github.com/lumirlumir/npm-clang-format-node/issues/new/choose) before contributing.

### Installation

1. Fork it.

1. Clone it to your local directory. ([Git](https://git-scm.com/downloads) is required.)

    ```bash
    git clone https://github.com/lumirlumir/npm-clang-format-node.git
    ```

1. Move to the `npm-clang-format-node` directory.

    ```bash
    cd npm-clang-format-node
    ```

1. Install npm packages. ([Node.js](https://nodejs.org/en) is required.)

    ```bash
    npm install
    ```

1. Edit codes.

1. Create `my-branch` branch.

    ```bash
    git switch -c my-branch
    ```

1. Commit your changes. (`husky` and `lint-staged` will lint and test your changed files!)

    ```bash
    git commit -am "commit type: title"
    ```

1. Push them to your remote branch.

1. Submit a pull request.👍

### About `os.platform()` and `os.arch()` in Node.js

#### [os.platform()](https://nodejs.org/docs/v20.17.0/api/os.html#osplatform)

The return value is equivalent to `process.platform`.

OS      | return value of `os.platform()` |
------- | ---------------------------------- |
macOS   | `darwin`                           |
Linux   | `linux`                            |
Windows | `win32`                            |

#### [os.arch()](https://nodejs.org/docs/v20.17.0/api/os.html#osarch)

The return value is equivalent to `process.arch`.

Architecture       | return value of `os.arch()` | LLVM      | Docker Platform | Docker Ubuntu Image |
------------------ | ------------------------------ | --------- | --------------- | ------------------- |
arm(armv7, armv7l) | `arm`                          | `ARM`     | `arm/v7`        | `arm32v7`           |
arm64              | `arm64`                        | `AArch64` | `arm64/v8`      | `arm64v8`           |
ppc64le[^1]        | `ppc64`                        | `PowerPC` | `ppc64le`       | `ppc64le`           |
s390x              | `s390x`                        | `SystemZ` | `s390x`         | `s390x`             |
x64                | `x64`                          | `X86`     | `amd64`         | `amd64`             |

[^1]: `le` stands for little-endian, but the `os.arch()` function does not distinguish between endianness and returns a single value.

### Build process

Some packages for **cross-compilation** have been deprecated, making it difficult to make build processes directly, so **cross-compilation** is not used.

**Linux** is built using QEMU and Docker. **macOS** and **Windows** are built using the `macos-13`, `macos-14`, and `windows-latest` runners on GitHub Actions.

## Versioning

This project adheres to [Semantic Versioning](https://semver.org/).

[LLVM versions](https://github.com/llvm/llvm-project/releases) are managed as dependencies, so upgrading the LLVM version is treated as a 'patch'. Additionally, the release title includes the LLVM version, like `v1.0.0 (llvmorg-18.1.8)`.

See [`.clang-format-version`](/.clang-format-version) to check the exact current LLVM version.

## Change Log

See [`CHANGELOG.md`](/CHANGELOG.md)

## License

[MIT](/LICENSE) under [LLVM Apache License 2.0](https://github.com/llvm/llvm-project/blob/main/LICENSE.TXT)
