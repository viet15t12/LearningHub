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

Một trong những mục tiêu của Go là giúp lập trình viên viết code hiệu quả hơn (efficiently). Điều này yêu cầu Go phải có cú pháp đơn giản và tốc độ biên dịch nhanh, nên các tác giả của Go đã phải xem xét lại (reconsider) cách định dạng (formatting) code.

Hầu hết các ngôn ngữ lập trình khác đều cho phép rất nhiều sự linh hoạt (flexibility) trong cách viết và định dạng code. Ngược lại, Go quy định một dạng chuẩn thống nhất. Điều này giúp cho việc phát triển các công cụ (tools) để phân tích và xử lý code trở nên dễ dàng hơn.

Ngoài ra còn có một lợi ích (benefit) khác. Trước đây, các Dev thường tốn nhiều thời gian để tranh cãi về cách định dạng (formatting) code. Go đã quy định một dạng chuẩn thống nhất, nên các Dev Go hầu như không còn phải tranh luận về vấn đề này nữa.

Ví dụ, Go sử dụng **Tab** để thụt đầu dòng (indentation) theo định dạng chuẩn. Go cũng có những quy tắc về cách đặt dấu ngoặc nhọn `{`.

Ví dụ:

**Đúng:**

```go
func main() {
	if condition {
		// code
	}
}
```

**Sai:**

```go
func main()
{
	if condition
	{
		// code
	}
}
```

Trường hợp thứ hai không chỉ sai về cách định dạng (formatting), mà còn gây ra lỗi cú pháp (syntax error). Nguyên nhân của vấn đề này sẽ được giải thích ở phần **Semicolon Insertion Rule** bên dưới.

Go development tools có một command là `go fmt`, dùng để tự động sửa khoảng trắng (whitespace) và thụt đầu dòng (indentation) trong code để phù hợp với định dạng chuẩn của Go.

Chạy:

```bash
$ go fmt ./...

hello.go
```

Trong đó:

```text
./...
```

có nghĩa là yêu cầu Go tool áp dụng command cho tất cả các package trong thư mục hiện tại (current directory) và các thư mục con (subdirectories).

Cách sử dụng `./...` này sẽ còn xuất hiện nhiều lần khi chúng ta học thêm các Go tools khác.

Nếu mở lại file `hello.go` sau khi chạy `go fmt`, ta sẽ thấy dòng:

```go
fmt.Println("Hello world!")
```

đã được thụt đầu dòng đúng bằng một Tab.

Ví dụ code ban đầu:

```go
package main

import "fmt"

func main() {
fmt.Println("Hello world!")
}
```

Sau khi chạy:

```bash
$ go fmt ./...
```

sẽ trở thành:

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello world!")
}
```

Tuy nhiên, `go fmt` không thể sửa trường hợp dấu ngoặc nhọn `{` được đặt sai dòng. Nguyên nhân là do một quy tắc (rule) của Go có tên là **Semicolon Insertion Rule**.



<details>
<summary><b>Click để xem: The Semicolon Insertion Rule</b></summary>

### The Semicolon Insertion Rule

Giống như C hoặc Java, Go yêu cầu dấu chấm phẩy (semicolon) `;` ở cuối mỗi câu lệnh (statement). Tuy nhiên, các Dev Go gần như không bao giờ phải tự viết dấu `;`.

Thay vào đó, Go compiler sẽ tự động thêm dấu `;` dựa theo một quy tắc đơn giản.

Nếu token cuối cùng trước khi xuống dòng (newline) thuộc một trong các trường hợp sau, Go sẽ tự động thêm dấu `;` sau token đó:

* Một định danh (identifier), bao gồm những từ như `int`, `float64`, tên biến, tên hàm,...
* Một giá trị cơ bản (basic literal), ví dụ như một số hoặc một chuỗi (string).
* Một trong các token sau:

```text
break
continue
fallthrough
return
++
--
)
]
}
```

Với quy tắc này, chúng ta có thể hiểu tại sao đặt dấu `{` sai dòng lại làm code bị lỗi.

Ví dụ:

```go
func main()
{
	fmt.Println("Hello, world!")
}
```

Ở dòng:

```go
func main()
```

token cuối cùng là:

```text
)
```

Theo **Semicolon Insertion Rule**, Go sẽ tự động thêm dấu `;` sau `)`.

Vì vậy đoạn code trên sẽ được Go hiểu gần giống như:

```go
func main();
{
	fmt.Println("Hello, world!");
};
```

Lúc này:

```go
func main();
```

không phải là một khai báo hàm (function declaration) hợp lệ trong Go, nên chương trình sẽ bị lỗi khi biên dịch (compile).

Đây cũng là lý do chúng ta phải viết:

```go
func main() {
	fmt.Println("Hello, world!")
}
```

thay vì:

```go
func main()
{
	fmt.Println("Hello, world!")
}
```

`go fmt` cũng không thể sửa dấu `{` trong trường hợp này, bởi vì vấn đề không còn đơn giản là lỗi định dạng (formatting error). Do **Semicolon Insertion Rule**, đoạn code đã trở thành code không hợp lệ (invalid code).

Quy tắc tự động thêm dấu chấm phẩy (semicolon insertion) và giới hạn vị trí của dấu `{` vừa giúp Go compiler đơn giản và nhanh hơn, vừa giúp Go duy trì một phong cách viết code (coding style) thống nhất.

> **Ghi nhớ:** Khi viết Go, chúng ta hầu như không cần tự thêm dấu `;`. Go sẽ tự động thêm chúng dựa trên **Semicolon Insertion Rule**.

</details>

### Go vet

Trong một số bugs, mã nguồn đúng về mặt cú pháp nhưng rất có thể bị sai về logic. Công cụ go đi kèm một lệnh gọi là `go vet` để phát hiện các loại lỗi này. Hãy thêm một lỗi vào chương trình và quan sát nó bị phát hiện. Hãy sửa dòng `fmt.Println` trong tệp `hello.go` thành như sau

```go
fmt.Printf("Hello, %s!\n")
```

> **Lưu ý:** `fmt.Printf` tương tự như printf trong các ngôn ngữ C, Java, Ruby và nhiều ngôn ngữ khác. Nếu bạn chưa từng gặp fmt.Printf, thì đây là một hàm nhận tham số đầu tiên là một mẫu (template), còn các tham số còn lại cung cấp giá trị cho những vị trí giữ chỗ (placeholder) trong mẫu đó.

Trong ví dụ này, bạn có một mẫu `("Hello, %s!\n")` với một chỗ giữ chỗ (placeholder) là %s, nhưng lại không chỉ định giá trị nào cho chỗ giữ chỗ đó. Đoạn mã này vẫn sẽ biên dịch và chạy được, nhưng nó không chính xác. Một trong những vấn đề mà `go vet` phát hiện là liệu có giá trị nào tương ứng cho mọi chỗ giữ chỗ trong mẫu định dạng hay không. Khi chạy `go vet` trên đoạn mã đã sửa đổi, công cụ này sẽ phát hiện ra lỗi:

```
$ go vet ./...

# hello_world

./hello.go:6:2: fmt.Printf format %s reads arg #1, but call has 0 args
```

Giờ khi `go vet` đã phát hiện ra lỗi, bạn có thể dễ dàng sửa nó. Hãy thay đổi dòng 6 trong tệp `hello.go` thành:

```Go
fmt.Printf("Hello, %s!\n", "world")
```

Mặc dù `go vet` phát hiện được một số lỗi lập trình phổ biến, nhưng vẫn có những lỗi nằm ngoài khả năng nhận diện của nó. May mắn thay, các công cụ kiểm tra chất lượng mã nguồn Go của bên thứ ba có thể giúp lấp đầy khoảng trống này. Một số công cụ phổ biến nhất được đề cập trong phần "Using Code-Quality Scanners" (Sử dụng các công cụ quét chất lượng mã nguồn) ở trang 267.

Cũng giống như việc bạn nên chạy `go fmt` để đảm bảo mã nguồn được định dạng đúng quy chuẩn, hãy chạy `go vet` để quét các lỗi tiềm ẩn trong mã nguồn hợp lệ. Các lệnh này chỉ là bước khởi đầu để đảm bảo chất lượng mã nguồn của bạn. Ngoài những lời khuyên trong cuốn sách này, tất cả các lập trình viên Go nên đọc tài liệu *Effective Go* và trang *Code Review Comments* trên wiki của Go để hiểu rõ thế nào là mã nguồn Go chuẩn mực (idiomatic Go).
