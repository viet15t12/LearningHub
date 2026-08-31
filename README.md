# Learning Hub

Learning Hub là kho ghi chú cá nhân về công nghệ thông tin, được xây dựng bằng
[MkDocs Material](https://squidfunk.github.io/mkdocs-material/). Nội dung được
chia thành các lộ trình ngắn gọn để thuận tiện học tập, thực hành và tra cứu.

## Lộ trình học tập

| Chủ đề | Nội dung | Trạng thái |
|---|---|---|
| [CCNA 200-301](docs/CCNA/index.md) | Networking, switching, routing, security, wireless và automation | Đã có 63 bài |
| [Learning Go](docs/GOLANG/README.md) | Ghi chú theo từng chương của sách *Learning Go* | Đang cập nhật |

## Đọc tài liệu

- [Mở trang chủ tài liệu](docs/index.md)
- [Bắt đầu học CCNA](docs/CCNA/01_Network_Devices.md)
- [Bắt đầu học Go](docs/GOLANG/chapter_01_setting_up_go_environment.md)

Để chạy website trên máy cá nhân:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

Sau đó truy cập `http://127.0.0.1:8000` trên trình duyệt.

## Cấu trúc thư mục

```text
.
├── docs/
│   ├── CCNA/       # Ghi chú CCNA 200-301
│   ├── GOLANG/     # Ghi chú Learning Go
│   └── index.md    # Trang chủ tài liệu
├── mkdocs.yml      # Cấu hình website
└── requirements.txt
```

## Đóng góp nội dung

Khi thêm bài Go mới, hãy đặt tên theo mẫu
`chapter_NN_ten_chuong.md` và thêm liên kết của bài vào
[`docs/GOLANG/README.md`](docs/GOLANG/README.md).

Nội dung trong repository là ghi chú học tập cá nhân và sẽ tiếp tục được chỉnh
sửa, bổ sung theo thời gian.

