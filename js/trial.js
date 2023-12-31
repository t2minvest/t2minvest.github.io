document.addEventListener('DOMContentLoaded', function() {
  var container = document.getElementById('iframe-container');
  var overlay = document.getElementById('overlay');

  // Define your iframe HTML strings here
  var iframes = {
    page1: '<iframe title="T2M Invest" class="iframe-style" width="1300px" height="3890px" src="https://app.powerbi.com/view?r=eyJrIjoiNGY5ZTBjNjctMmI5OC00MjU2LThkZjYtMGZlMTQzODIzNTRmIiwidCI6IjUxZmUxNTRlLThlNTYtNGM2NC05ZDM5LTU2NTc0ZDk3MmU1YyIsImMiOjEwfQ%3D%3D" frameborder="0" style="background-color: #000;"></iframe>'
    // Removed iframes for page2, page3, and page4
  };

  function changeIframeContent(page) {
    container.innerHTML = iframes[page];
    showOverlay();
  }

  function showOverlay() {
    overlay.style.display = 'block';
    setTimeout(function() {
      overlay.style.display = 'none';
    }, 3000);
  }

  // Event listeners for buttons
  document.getElementById('page1-btn').addEventListener('click', function() { changeIframeContent('page1'); });
  document.getElementById('page2-btn').addEventListener('click', function() { window.location.href = 'trial_login.html'; });
  document.getElementById('page3-btn').addEventListener('click', function() { window.location.href = 'trial_login.html'; });
  document.getElementById('page4-btn').addEventListener('click', function() { window.location.href = 'trial_login.html'; });

  // Initialize with the content of page 1
  changeIframeContent('page1');
});



// Hàm cập nhật kích thước iframe
function updateIframeSize() {
  const iframe = document.querySelector('.iframe-style');
  // Lấy giá trị từ thuộc tính width và height của thẻ iframe
  const originWidth = parseInt(iframe.width, 10);
  const originHeight = parseInt(iframe.height, 10);

  const currentWidth = window.innerWidth;
  let newHeight = originHeight;

  if (currentWidth < originWidth) {
    const widthDecrease = originWidth - currentWidth;
    newHeight -= widthDecrease * (originHeight/originWidth - 0.03);
  }

  // Đặt chiều cao mới cho iframe
  iframe.style.height = `${newHeight}px`;
}

window.addEventListener('resize', updateIframeSize); // Thêm event listener để cập nhật kích thước khi cửa sổ được resize
document.addEventListener('DOMContentLoaded', updateIframeSize); // Cập nhật kích thước ban đầu khi tải trang

// Hàm thêm hình chữ nhật màu đen vào cuối container
function addOverlayToContainer() {
  // Find the container element
  var container = document.querySelector('.container');

  // Create a new div element for the overlay
  var overlay = document.createElement('div');

  // Style the overlay
  overlay.style.position = 'absolute'; // Position it absolutely within the container
  overlay.style.bottom = '0'; // Align it to the bottom of the container
  overlay.style.left = '0'; // Align it to the left of the container
  overlay.style.width = '100%'; // Make it as wide as the container
  overlay.style.height = '70px'; // Set the height of the overlay
  overlay.style.backgroundColor = 'rgba(0, 0, 0)'; // Set the background color and opacity
  overlay.style.zIndex = '1000'; // Ensure it sits on top of other content

  // Append the overlay to the container
  container.style.position = 'relative'; // Ensure the container can hold absolute elements
  container.appendChild(overlay);
}

// Run the function to add the overlay
addOverlayToContainer();


//Hàm đăng nhập
function promptLogin() {
  fetch('credentials.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Không thể tải file credentials.json');
          }
          return response.json();
      })
      .then(credentials => {
          var userId = prompt('Nhập ID của bạn:');
          var password = prompt('Nhập mật khẩu của bạn:');
          
          if (credentials[userId] && credentials[userId] === password) {
              alert('Đăng nhập thành công!');
              // Thực hiện các hành động sau khi đăng nhập thành công ở đây.
          } else {
              alert('ID hoặc mật khẩu không đúng. Vui lòng thử lại.');
              promptLogin(); // Gọi lại hàm để người dùng đăng nhập lại.
          }
      })
      .catch(error => {
          console.error('Đã có lỗi xảy ra:', error);
      });
}

let timeoutId;

function resetTimeout() {
    // Hủy bỏ hẹn giờ cũ nếu có
    clearTimeout(timeoutId);

    // Thiết lập hẹn giờ mới
    timeoutId = setTimeout(() => {
        window.location.reload(); // Làm mới trang web
    }, 100000); // 300000 milliseconds = 5 minutes
}

// Khởi tạo hẹn giờ khi trang được tải
resetTimeout();

// Lắng nghe sự kiện trên toàn trang để đặt lại hẹn giờ
document.addEventListener('click', resetTimeout);
document.addEventListener('mousemove', resetTimeout);
document.addEventListener('keypress', resetTimeout);
document.addEventListener('scroll', resetTimeout);
