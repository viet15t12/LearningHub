# Chapter 1: Setting Up Your Go Environment

## Install the Go tool

Trước khi bắt đầu viết code, chúng ta cần cài đặt Go trên máy. Truy cập trang chủ [go.dev/dl](https://go.dev/dl/) và tải bản cài đặt phù hợp với hệ điều hành đang dùng (Windows, macOS, hoặc Linux).

- **Windows/macOS**: chạy file cài đặt (`.msi` hoặc `.pkg`) vừa tải về, làm theo các bước hướng dẫn trên màn hình.
- **Linux**: tải file `.tar.gz`, giải nén vào `/usr/local`, sau đó thêm `/usr/local/go/bin` vào biến môi trường `PATH`:

```bash
$ rm -rf /usr/local/go && tar -C /usr/local -xzf go1.xx.x.linux-amd64.tar.gz
$ export PATH=$PATH:/usr/local/go/bin
```

Sau khi cài đặt xong, mở terminal (hoặc command prompt) mới và kiểm tra bằng lệnh:

```bash
$ go version
go version go1.xx.x linux/amd64
```

Nếu terminal in ra phiên bản Go vừa cài, nghĩa là quá trình cài đặt đã thành công.

### Troubleshooting your Go install

Nếu lệnh `go version` báo lỗi kiểu `command not found` hoặc `'go' is not recognized`, khả năng cao là biến môi trường `PATH` chưa trỏ đúng đến thư mục cài Go. Một vài điều cần kiểm tra:

- **Kiểm tra PATH**: đảm bảo thư mục chứa binary `go` (thường là `/usr/local/go/bin` trên Linux/macOS, hoặc `C:\Go\bin` trên Windows) đã được thêm vào `PATH`.
- **Mở lại terminal**: sau khi chỉnh sửa `PATH` (ví dụ trong file `.bashrc`, `.zshrc`, hoặc Environment Variables trên Windows), cần đóng và mở lại terminal để thay đổi có hiệu lực.
- **Kiểm tra biến GOROOT/GOPATH**: nếu trước đó đã từng cài Go bằng cách khác (ví dụ qua trình quản lý gói), có thể xảy ra xung đột giữa nhiều bản cài. Dùng lệnh `which go` (Linux/macOS) hoặc `where go` (Windows) để xem binary `go` đang được gọi từ đâu.
- **Cài lại sạch**: nếu vẫn không được, gỡ hoàn toàn bản cài cũ rồi cài lại theo đúng hướng dẫn trên go.dev.

### Go tooling

Sau khi cài đặt, Go đi kèm với một bộ command-line tool khá đầy đủ, được gọi thông qua lệnh gốc `go`. Một số lệnh thường dùng:

- `go build`: biên dịch chương trình thành file thực thi.
- `go run`: biên dịch và chạy chương trình ngay lập tức mà không tạo file thực thi lưu lại.
- `go fmt`: tự động định dạng lại code theo chuẩn của Go.
- `go vet`: phân tích tĩnh code, giúp phát hiện các lỗi tiềm ẩn trước khi build.
- `go mod`: quản lý module và dependencies của chương trình (ví dụ `go mod init`, `go mod tidy`).
- `go get`: tải về và cài đặt các module/package bên ngoài.

Ta có thể xem toàn bộ danh sách lệnh cũng như hướng dẫn sử dụng bằng cách chạy:

```bash
$ go help
```

Các lệnh này sẽ được tìm hiểu chi tiết hơn xuyên suốt các bài học tiếp theo.

## First Go Program

### Making Go Module

Điều đầu tiên chúng ta cần tạo thư mục chứa chương trình:

```bash
$ mkdir ch1
$ cd ch1
```

Bên trong thư mục này, chạy lệnh `go mod init` để đánh dấu thư mục này là một Go Module:

```bash
$ go mod init hello_world
go: creating new go.mod: module hello_world
```

Chúng ta sẽ tìm hiểu kỹ hơn về module ở các bài sau.

File `go.mod` khai báo tên module, phiên bản Go tối thiểu hỗ trợ cho module đó, và bất kỳ module nào khác mà chương trình phụ thuộc (depends). Nó giống như file `requirements.txt` dùng cho Python.

Chúng ta không nên sửa trực tiếp file `go.mod`, thay vào đó nên sử dụng các command như `go get` hoặc `go mod tidy` để quản lý file này.

### Go build

Trong thư mục `ch1`, tạo file `hello.go` — đây sẽ là file code ví dụ:

```go
package main

import "fmt"

func main(){
fmt.Println("Hello world!")
}
```

> **Lưu ý:** phần lỗi thụt lề của đoạn code trên là do tác giả cố ý.

- **Khai báo `package`**: Trong mỗi Go module, mã được tổ chức thành một hoặc nhiều gói (`package`). `main package` là gói chính trong Go module, giúp chương trình có thể chạy được (thực thi).

- **Khai báo `import`**: Phần `import` sẽ liệt kê các package được dùng trong file code. `fmt` là một thư viện chuẩn của Go mà ta cần dùng nên liệt kê ở đó. Khác với các ngôn ngữ khác, Go import cả package — bạn không thể giới hạn `import` cụ thể (specific) như `types`, `functions`, `constants`, hoặc `variable` trong một package.

- **Hàm `main`**: Tất cả chương trình Go bắt đầu từ hàm `main` trong `main package`, bạn khai báo hàm này bằng cách `func main(){...}`.

Chạy lệnh build:

```bash
$ go build
```

Thao tác này sẽ tạo 1 file thực thi `hello_world` (nếu trên Windows sẽ tạo file `hello_world.exe`) trong cùng thư mục. Khi chạy file này sẽ in ra `Hello world!`:

```bash
$ ./hello_world
Hello world!
```

Tên của file binary này sẽ trùng với phần khai báo module trong file `go.mod`. Nhưng nếu bạn muốn tạo file thực thi với tên khác hoặc ở một vị trí khác, ta sử dụng cờ `-o`. Ví dụ:

```bash
$ go build -o hello
```

### Go fmt

Một trong những mục tiêu của Go là giúp lập trình viên viết code hiệu quả hơn (efficiently). Điều này đòi hỏi Go phải có cú pháp đơn giản và tốc độ biên dịch nhanh, buộc các tác giả phải xem xét lại (reconsider) cách định dạng code. Hầu hết các ngôn ngữ khác đều cung cấp sự linh hoạt rất lớn (great deal of flexibility) trong cú pháp. Ngược lại, Go áp dụng một chuẩn định dạng duy nhất, giúp việc phát triển các công cụ phân tích và xử lý code trở nên dễ dàng hơn nhiều (great deal easier). Nhờ đó, việc xây dựng trình biên dịch cũng như các công cụ tự động sinh mã được đơn giản hóa đáng kể.

Ngoài ra còn có một ích khác. Trước đây 
