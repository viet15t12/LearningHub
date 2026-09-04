
# Chapter 2: Predeclared Types & Declarations

## Các kiểu tiền khai báo (The Predeclared Types)

Go có nhiều kiểu dữ liệu được tích hợp sẵn trong ngôn ngữ. Chúng được gọi là *predeclared types*. Tương tự như những ngôn ngữ khác, Go cũng có các kiểu như: `boolean`, `integer`, `float`, và `string`. Việc sử dụng các kiểu dữ liệu một cách hiệu quả đôi khi là một thử thách đối với lập trình viên mới chuyển từ ngôn ngữ khác sang. Hãy cùng điểm qua các khái niệm cơ bản của kiểu dữ liệu trong Go.

### The Zero Value (Giá trị mặc định)

Giống như các ngôn ngữ khác, Go luôn gán một giá trị mặc định (zero value) cho bất kỳ biến nào đã được khai báo mà chưa được gán giá trị. Tuỳ vào kiểu dữ liệu, giá trị mặc định đó sẽ khác nhau.

| Kiểu dữ liệu | Zero Value |
|---|---|
| `bool` | `false` |
| `int`, `float64`, ... | `0` |
| `string` | `""` |
| `pointer`, `slice`, `map`, `channel`, `func`, `interface` | `nil` |

### Literals

> **Lưu ý:** *Literal* dịch ra là "hằng số viết trực tiếp trong mã nguồn".

Go literal là một số, một ký tự, hoặc một chuỗi ký tự được biểu diễn một cách tường minh (explicitly).

Có 4 loại literal phổ biến:
- An integer literal
- A floating-point literal
- A rune literal
- A string literal

> **Lưu ý:** Khi bàn về số phức, chúng ta sẽ tìm hiểu loại thứ 5 — một loại hiếm gặp.

#### An Integer Literal

Integer literal là một dãy các chữ số. Mặc định ở hệ 10 (base 10), nhưng có thể dùng tiền tố khác để biểu diễn hệ cơ số khác: `0b` cho hệ nhị phân (base 2), `0o` cho hệ bát phân (base 8), hoặc `0x` cho hệ thập lục phân (base 16). Tiền tố có thể viết hoa hoặc thường. Một số bắt đầu bằng `0` mà không kèm chữ cái phía sau cũng là cách biểu diễn số bát phân — nhưng đừng dùng vì rất dễ gây nhầm lẫn.

Để dễ đọc hơn với các integer literal dài, Go cho phép chèn dấu gạch dưới `_` ở giữa literal, ví dụ để phân nhóm theo hàng nghìn ở hệ 10 (`1_234`). Dấu gạch dưới không ảnh hưởng đến giá trị số. Giới hạn duy nhất: không đặt `_` ở đầu/cuối số, và không đặt hai dấu `_` liền kề nhau. Hãy dùng chúng để ngắt số hệ 10 tại vị trí hàng nghìn, hoặc ngắt số nhị phân/bát phân/thập lục phân tại ranh giới 1, 2, hoặc 4 byte — đừng lạm dụng bằng cách đặt `_` giữa mọi chữ số.

```go
var dec = 1234        // hệ 10
var bin = 0b1010      // hệ 2
var oct = 0o17        // hệ 8
var hex = 0x1A2B      // hệ 16
var confusing = 017   // KHÔNG nên dùng — cũng là hệ 8 nhưng dễ gây nhầm

var readable = 1_000_000   // dễ đọc hơn
var messy = 1_0_0_0_0_0_0  // KHÔNG nên dùng — dùng _ quá mức
```

#### A Floating-point Literal

Floating-point literal có dấu chấm thập phân để biểu diễn phần lẻ của giá trị. Có thể có số mũ, chỉ định bằng chữ `e` kèm số dương hoặc âm (ví dụ `6.03e23`). Cũng có thể viết dưới dạng thập lục phân bằng tiền tố `0x`, dùng chữ `p` để chỉ định số mũ (`0x12.34p5`, tương đương `582.5` ở hệ 10). Giống integer literal, có thể dùng `_` để định dạng cho dễ đọc.

```go
var f1 = 3.14
var f2 = .25
var f3 = 6.03e23         // ký hiệu khoa học, số mũ dương
var f4 = 1.5e-10         // số mũ âm
var f5 = 0x12.34p5       // hệ thập lục phân, = 582.5 ở hệ 10
var f6 = 1_234.567_8     // dùng _ để dễ đọc
```

> **Lưu ý thực tế:** Nên dùng hệ 10 để biểu diễn integer và floating-point literal. Bát phân khá hiếm gặp, chủ yếu dùng cho quyền hạn POSIX (ví dụ `0o777` cho `rwxrwxrwx`). Thập lục phân và nhị phân đôi khi dùng cho bit filter hoặc ứng dụng mạng, hạ tầng. Tránh dùng escape số cho rune literal, trừ khi ngữ cảnh giúp code rõ ràng hơn.

#### A Rune Literal

Rune literal biểu diễn một ký tự, đặt trong dấu nháy đơn. Khác với nhiều ngôn ngữ khác, trong Go dấu nháy đơn và nháy kép **không** thể dùng thay thế cho nhau. Rune literal có thể viết dưới dạng:

- Ký tự Unicode đơn (`'a'`)
- Số bát phân 8-bit (`'\141'`)
- Số thập lục phân 8-bit (`'\x61'`)
- Số thập lục phân 16-bit (`'\u0061'`)
- Số Unicode 32-bit (`'\U00000061'`)

Ngoài ra còn có một số rune literal thoát bằng backslash, hữu ích nhất là: xuống dòng (`'\n'`), tab (`'\t'`), nháy đơn (`'\''`), và backslash (`'\\'`).

```go
var r1 = 'a'
var r2 = '\141'          // octal
var r3 = '\x61'          // hex 8-bit
var r4 = '\u0061'        // hex 16-bit
var r5 = '\U00000061'    // Unicode 32-bit
var newline = '\n'
var tab = '\t'
```

#### A String Literal

Có hai cách biểu diễn string literal:

**Interpreted string literal** — dùng dấu nháy kép, ví dụ `"Greetings and Salutations"`. Loại này chứa 0 hoặc nhiều rune literal, được gọi là "interpreted" vì nó diễn giải các rune literal (cả dạng số lẫn dạng escape) thành từng ký tự đơn. Escape nháy đơn (`\'`) không hợp lệ trong string literal — dùng escape nháy kép (`\"`) thay thế. Các ký tự không thể xuất hiện trực tiếp là: backslash chưa thoát, xuống dòng chưa thoát, và nháy kép chưa thoát.

```go
var s1 = "Greetings and\n\"Salutations\""
```

**Raw string literal** — nếu cần chứa backslash, nháy kép, hoặc xuống dòng, dùng raw string literal sẽ dễ hơn. Được bao quanh bởi dấu backtick (`` ` ``), chứa bất kỳ ký tự nào ngoại trừ backtick, không có escape — mọi ký tự giữ nguyên như đã gõ.

```go
var s2 = `Greetings and
"Salutations"`
```

### Booleans

Kiểu `bool` biểu diễn các biến kiểu Boolean, chỉ nhận một trong hai giá trị: `true` hoặc `false`. Zero value của `bool` là `false`:

```go
var flag bool // chưa gán giá trị, mặc định là false
var isAwesome = true
```

### Numeric Types (Các kiểu số)

Go có khá nhiều kiểu dữ liệu số — khoảng 12 kiểu (cùng một vài tên gọi đặc biệt) — được chia thành ba nhóm: số nguyên, số thực dấu phẩy động, và số phức.

#### Integer Types

Go cung cấp cả số nguyên có dấu và không dấu với nhiều kích thước khác nhau, từ 1 đến 8 byte.

| Type name | Value range |
|---|---|
| `int8` | -128 to 127 |
| `int16` | -32768 to 32767 |
| `int32` | -2147483648 to 2147483647 |
| `int64` | -9223372036854775808 to 9223372036854775807 |
| `uint8` | 0 to 255 |
| `uint16` | 0 to 65535 |
| `uint32` | 0 to 4294967295 |
| `uint64` | 0 to 18446744073709551615 |

Có thể thấy rõ ngay từ tên gọi: zero value của mọi kiểu số nguyên là `0`.

**Các tên gọi đặc biệt cho số nguyên**

Go có một số tên đặc biệt dành cho các kiểu số nguyên:

| Tên đặc biệt | Bản chất | Ghi chú |
|---|---|---|
| `byte` | Alias (bí danh) của `uint8` | Có thể gán, so sánh, hoặc thực hiện phép toán giữa `byte` và `uint8` một cách hợp lệ. Trong code Go, bạn hiếm khi thấy `uint8` — người ta thường gọi nó là `byte`. |
| `int` | Trên CPU 32-bit: số nguyên có dấu 32-bit (giống `int32`). Trên hầu hết CPU 64-bit: số nguyên có dấu 64-bit (giống `int64`) | Vì `int` không nhất quán giữa các nền tảng, việc gán, so sánh, hoặc thực hiện phép toán giữa `int` và `int32`/`int64` mà không chuyển đổi kiểu tường minh sẽ gây lỗi biên dịch. Integer literal mặc định có kiểu `int`. |
| `uint` | Tương tự `int`, nhưng không dấu (giá trị luôn là 0 hoặc dương) | Áp dụng cùng quy tắc như `int` về tính không nhất quán giữa các nền tảng. |

> **Lưu ý:** Một số kiến trúc CPU 64-bit hiếm gặp dùng số nguyên có dấu 32-bit cho kiểu `int`. Go hỗ trợ ba kiến trúc như vậy: `amd64p32`, `mips64p32`, và `mips64p32le`.

**Lựa chọn kiểu số phù hợp**

Do Go cung cấp nhiều kiểu số nguyên, bạn có thể sẽ băn khoăn khi mới tìm hiểu. Có 3 quy tắc đơn giản để chọn:

- Nếu bạn làm việc với binary file format hoặc network protocol yêu cầu số nguyên có kích thước hoặc tính chất (có dấu/không dấu) cụ thể, hãy dùng kiểu số nguyên tương ứng.
- Nếu bạn viết một library function cần hoạt động với bất kỳ kiểu số nguyên nào, hãy tận dụng generics của Go và dùng tham số kiểu tổng quát để đại diện cho bất kỳ kiểu số nguyên nào.
- Trong mọi trường hợp còn lại, chỉ cần dùng `int`.

> Trong nhiều trường hợp, bạn có thể sẽ bắt gặp các đoạn code cũ (legacy code) có một cặp hàm làm cùng một việc, nhưng một hàm dùng `int64`, hàm kia dùng `uint64`. Lý do là API đó được tạo ra trước khi generics được thêm vào Go. Khi chưa có generics, bạn buộc phải viết các hàm với tên hơi khác nhau để triển khai cùng thuật toán cho các kiểu khác nhau. Dùng `int64` và `uint64` nghĩa là bạn chỉ cần viết code một lần, để bên gọi tự chuyển đổi kiểu khi truyền giá trị vào và khi nhận dữ liệu trả về. Bạn có thể thấy pattern này trong thư viện chuẩn của Go, cụ thể ở hai hàm `FormatInt` và `FormatUint` trong package `strconv`.

**Các toán tử số nguyên**

Go hỗ trợ các toán tử số học thông thường cho số nguyên: `+`, `-`, `*`, `/`, cùng `%` cho phép chia lấy dư (modulus). Kết quả phép chia số nguyên luôn là số nguyên; muốn có kết quả dạng số thực, bạn cần chuyển đổi kiểu trước.

Hãy cẩn thận không chia một số nguyên cho `0` — điều này sẽ gây ra panic. Phép chia số nguyên trong Go tuân theo quy tắc làm tròn về 0 (truncation toward zero); xem thêm [Go spec - Arithmetic operators](https://go.dev/ref/spec#Arithmetic_operators) để biết chi tiết đầy đủ.

Bạn có thể kết hợp toán tử số học với `=` để cập nhật giá trị biến: `+=`, `-=`, `*=`, `/=`, `%=`. Ví dụ, đoạn code sau khiến `x` có giá trị `20`:

```go
var x int = 10
x *= 2
```

So sánh số nguyên bằng: `==`, `!=`, `>`, `>=`, `<`, `<=`.

Go cũng có các toán tử thao tác bit dành cho số nguyên: dịch bit trái/phải bằng `<<` và `>>`, hoặc bitmask với `&` (AND), `|` (OR), `^` (XOR), `&^` (AND NOT). Tương tự toán tử số học, có thể kết hợp với `=`: `&=`, `|=`, `^=`, `&^=`, `<<=`, `>>=`.

#### Floating-point Types

| Type name | Largest absolute value | Smallest (nonzero) absolute value |
|---|---|---|
| `float32` | 3.40282346638528859811704183484516925440e+38 | 1.401298464324817070923729583289916131280e-45 |
| `float64` | 1.797693134862315708145274237317043567981e+308 | 4.940656458412465441765687928682213723651e-324 |

Tương tự số nguyên, zero value của số thực dấu phẩy động là `0`.

Floating-point trong Go tương tự các ngôn ngữ khác. Go tuân theo đặc tả IEEE 754, cho phép biểu diễn khoảng giá trị lớn nhưng độ chính xác giới hạn. Việc chọn kiểu khá đơn giản: trừ khi cần tương thích với định dạng có sẵn, hãy dùng `float64`. Floating-point literal mặc định có kiểu `float64`, nên luôn dùng `float64` là lựa chọn đơn giản nhất — đồng thời giúp giảm vấn đề về độ chính xác, vì `float32` chỉ có khoảng sáu, bảy chữ số thập phân chính xác. Đừng lo về khác biệt kích thước bộ nhớ trừ khi bạn đã dùng profiler và xác định đây là nguồn gây vấn đề đáng kể (kiểm thử và profiling sẽ được đề cập ở Chương 15).

#### Complex Types

Go không có nhiều thứ để nói về hỗ trợ số phức. Go định nghĩa hai kiểu: `complex64` dùng `float32` cho phần thực và phần ảo, `complex128` dùng `float64`. Cả hai được khai báo bằng hàm dựng sẵn `complex`:

```go
var complexNum = complex(20.3, 10.2)
```

Go dùng vài quy tắc để xác định kiểu trả về của `complex`:

- Nếu dùng hằng số hoặc literal không có kiểu cho cả hai tham số, bạn tạo ra complex literal không có kiểu, mặc định `complex128`.
- Nếu cả hai giá trị là `float32`, bạn tạo ra `complex64`.
- Nếu một giá trị là `float32` và giá trị còn lại là hằng số/literal không có kiểu vừa trong phạm vi `float32`, bạn tạo ra `complex64`.
- Các trường hợp còn lại đều tạo ra `complex128`.

Tất cả toán tử số học dấu phẩy động chuẩn đều hoạt động trên số phức. Có thể dùng `==`/`!=` để so sánh, nhưng cùng giới hạn về độ chính xác — nên dùng kỹ thuật epsilon. Trích xuất phần thực/ảo bằng hàm dựng sẵn `real` và `imag`. Package `math/cmplx` cung cấp thêm hàm thao tác với `complex128`.

Zero value của cả hai kiểu số phức là số có cả phần thực lẫn phần ảo bằng `0`.

Đoạn code sau minh họa cách số phức hoạt động — bạn có thể chạy thử trên Go Playground hoặc trong thư mục `sample_code/complex_numbers` của repository Chapter 2:

```go
func main() {
    x := complex(2.5, 3.1)
    y := complex(10.2, 2)
    fmt.Println(x + y)
    fmt.Println(x - y)
    fmt.Println(x * y)
    fmt.Println(x / y)
    fmt.Println(real(x))
    fmt.Println(imag(x))
    fmt.Println(cmplx.Abs(x))
}
```

Kết quả:

```
(12.7+5.1i)
(-7.699999999999999+1.1i)
(19.3+36.62i)
(0.2934098482043688+0.24639022584228065i)
2.5
3.1
3.982461550347975
```

Bạn cũng thấy sự thiếu chính xác của số dấu phẩy động xuất hiện ở đây.

Loại literal nguyên thủy thứ 5 chính là: Go hỗ trợ **imaginary literal** để biểu diễn phần ảo của số phức — trông giống hệt floating-point literal nhưng có thêm hậu tố `i`.

Mặc dù có số phức như một predeclared type, Go không phải ngôn ngữ phổ biến cho tính toán số học. Việc áp dụng còn hạn chế vì các tính năng khác (như hỗ trợ ma trận) không phải một phần của ngôn ngữ, và thư viện phải dùng giải pháp kém hiệu quả như slice của slice (bạn sẽ tìm hiểu slice ở Chương 3, cách triển khai ở Chương 6). Nhưng nếu cần tính tập Mandelbrot hay triển khai bộ giải phương trình bậc hai, Go vẫn hỗ trợ bạn.

Lý do Go có số phức khá đơn giản: Ken Thompson, một trong những người tạo ra Go (và Unix), nghĩ rằng số phức sẽ là tính năng thú vị. Đã có thảo luận về việc loại bỏ số phức khỏi Go trong tương lai, nhưng bỏ qua tính năng này vẫn dễ hơn.

Nếu bạn muốn viết ứng dụng tính toán số học bằng Go, có thể dùng package bên thứ ba **Gonum** — tận dụng số phức và cung cấp thư viện cho đại số tuyến tính, ma trận, tích phân, thống kê. Nhưng nên cân nhắc các ngôn ngữ khác trước tiên.

### Sơ lược về String và Rune

Tiếp theo là kiểu chuỗi (string); giống như hầu hết các ngôn ngữ hiện đại, Go tích hợp sẵn kiểu chuỗi. Zero value của chuỗi là empty string. Go có hỗ trợ Unicode. Tương tự kiểu integers và floats, các chuỗi có thể được so sánh bằng nhau bằng toán tử ==, so sánh khác nhau bằng !=, hoặc so sánh thứ tự bằng >, >=, <, <=, và chúng được nối với nhau bằng toán tử +.

Chuỗi trong Go là bất biến (immutable); bạn có thể gán lại giá trị cho một biến kiểu chuỗi, nhưng không thể thay đổi nội dung của chính chuỗi đã được gán cho biến đó.

Go còn có một kiểu dữ liệu riêng để biểu diễn một code point đơn lẻ: kiểu `rune`. Về bản chất, `rune` chỉ là một alias của `int32`, tương tự như `byte` là alias của `uint8`. Tuy hai kiểu này tương đương nhau về mặt kỹ thuật, nhưng khi muốn biểu diễn một ký tự, bạn nên ưu tiên dùng `rune` thay vì `int32` — điều này giúp code dễ đọc và thể hiện đúng ý định hơn. Vì vậy, không khó đoán: kiểu mặc định của một hằng số rune chính là `rune`, còn kiểu mặc định của một hằng số chuỗi là `string`.

#### Chuyển đổi kiểu tường minh

Khác với các ngôn ngữ khác — vốn đều có tính năng `automatic type promotion`, giúp tự động chuyển đổi kiểu dữ liệu khi cần thiết — Go không có tính năng này, với mục tiêu đề cao sự rõ ràng về ý định và tính dễ đọc, đồng thời tránh sự phức tạp dẫn tới kết quả không mong muốn. Khi gặp các phép toán khác kiểu dữ liệu, bạn phải bắt buộc chuyển đổi thủ công, dù đó là phép toán giữa `integer` và `float`.

```go
// Ví dụ về chuyển đổi kiểu dữ liệu
var x int = 10
var y float64 = 30.2
var sum1 float64 = float64(x) + y
var sum2 int = x + int(y)
fmt.Println(sum1, sum2)
```

```go
// Chuyển đổi kiểu số nguyên
var x int = 10
var b byte = 100
var sum3 int = x + int(b)
var sum4 byte = byte(x) + b
fmt.Println(sum3, sum4)
```

Vì tính nghiêm ngặt về kiểu dữ liệu như vậy nên ở Go, mọi thao tác chuyển đổi đều phải thực hiện một cách tường minh (explicit). Tương tự như tính năng `automatic type promotion`, Go cũng không có tính năng `truthy` — hay nói rõ hơn, Go không xem bất kỳ kiểu dữ liệu nào khác là kiểu boolean.

#### Literals Are Untyped (Literal không có kiểu cố định)

Các `literal` không bị ràng buộc bởi kiểu dữ liệu cụ thể. Dù không thể cộng hai biến số nguyên nếu chúng được khai báo khác kiểu — nhưng với hằng số thì khác: Go cho phép dùng một hằng số nguyên ngay trong biểu thức số thực(float proint), thậm chí gán thẳng nó cho một biến kiểu `float64`.

```Go
var x float64 = 10
var y float64 = 200.3 * 5
```

### var Versus := (var so với :=)

### Sử dụng const

### Hằng số có kiểu và không có kiểu

### Unused Variables

### Đặt tên biến và hằng số

### Bài tập

### Tổng kết
