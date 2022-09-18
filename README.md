# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Giải pháp

1. Sử dụng useEffect call lại hàm filter mỗi khi thay đổi keySearch

2. Khi listProducts = 0 thì: 
- nếu đang có keySearch => Không tìm thấy sản phẩm
- nếu không có keySearch => Hiển thị tất cả sản phẩm

3. Khi listProducts > 0 thì: 
- Hiển thị tất cả sản phẩm thỏa mãn điều kiện lọc theo keySearch

### Giao diện

1. Hover vào ảnh sản phẩm để hiển thị thông tin chị tiết

### Logic search

1. Dùng toLowerCase() để đồng bộ keysearch và title về dạng viết thường

2. Dùng includes(keysearch) để kiểm tra xem keysearch có trong title nào

3. Sau đó dùng hàm filter để lọc những product thỏa mãn
