// 主题切换功能
const themeSwitch = document.getElementById('themeSwitch');
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

if (themeSwitch) {
  themeSwitch.addEventListener('click', toggleTheme);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);
});

// 语言切换功能
const languageSwitch = document.getElementById('languageSwitch');
const languageMenu = document.getElementById('languageMenu');

if (languageSwitch) {
  languageSwitch.addEventListener('click', function(e) {
    e.stopPropagation();
    languageMenu.classList.toggle('show');
    languageSwitch.classList.toggle('expanded');
  });
}

document.addEventListener('click', function(e) {
  if (languageSwitch && languageMenu && !languageSwitch.contains(e.target) && !languageMenu.contains(e.target)) {
    languageMenu.classList.remove('show');
    languageSwitch.classList.remove('expanded');
  }
});

const languageLinks = document.querySelectorAll('.language-link');
languageLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const lang = this.textContent;
    alert(`切换到 ${lang}`);
    if (languageMenu) {
      languageMenu.classList.remove('show');
    }
    if (languageSwitch) {
      languageSwitch.classList.remove('expanded');
    }
  });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (href === '#' || href === '') {
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// 表单提交
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('感谢您的咨询，我们将尽快与您联系！');
  this.reset();
});

// 图片轮播功能
const carouselImages = document.querySelectorAll('.carousel-image');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function showSlide(index) {
  carouselImages.forEach((img, i) => {
    img.classList.remove('active');
    indicators[i]?.classList.remove('active');
  });
  carouselImages[index]?.classList.add('active');
  indicators[index]?.classList.add('active');
  currentIndex = index;
}

if (prevBtn) {
  prevBtn.addEventListener('click', function() {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = carouselImages.length - 1;
    }
    showSlide(newIndex);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', function() {
    let newIndex = currentIndex + 1;
    if (newIndex >= carouselImages.length) {
      newIndex = 0;
    }
    showSlide(newIndex);
  });
}

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', function() {
    showSlide(index);
  });
});

// 用户头像下拉菜单
const avatarBtn = document.getElementById('avatarBtn');
const avatarMenu = document.getElementById('avatarMenu');

// 模拟登录状态 - 实际项目中应从后端获取
let isLoggedIn = false; // 默认为未登录状态

// 更新头像按钮显示状态
function updateAvatarDisplay() {
  if (avatarBtn) {
    if (isLoggedIn) {
      avatarBtn.classList.remove('logged-out');
    } else {
      avatarBtn.classList.add('logged-out');
    }
  }
}

// 页面加载时初始化显示状态
updateAvatarDisplay();

if (avatarBtn) {
  avatarBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    
    // 检查登录状态
    if (!isLoggedIn) {
      // 未登录，跳转到登录页
      alert('跳转到登录页');
      // 实际项目中使用：window.location.href = 'login.html';
      // 模拟登录成功
      isLoggedIn = true;
      updateAvatarDisplay();
      return;
    }
    
    // 已登录，切换菜单显示/隐藏
    avatarMenu.classList.toggle('show');
  });
}

// 点击页面其他地方关闭菜单
document.addEventListener('click', function(e) {
  if (avatarBtn && avatarMenu && !avatarBtn.contains(e.target) && !avatarMenu.contains(e.target)) {
    avatarMenu.classList.remove('show');
  }
});

// 菜单点击事件
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    const text = this.textContent;
    
    if (text === '退出登录') {
      isLoggedIn = false;
      updateAvatarDisplay();
      alert('已退出登录');
    } else {
      alert(`跳转到${text}`);
      // 实际项目中使用：window.location.href = '相应页面.html';
    }
    
    if (avatarMenu) {
      avatarMenu.classList.remove('show');
    }
  });
});