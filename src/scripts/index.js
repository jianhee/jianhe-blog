// Index
// --------------------------

// element
const $sidebar = $('.page-sidebar');
const $sidebarTitle = $sidebar.find('.title');
const $sidebarMenu = $('.menu');
const $container = $('.page-container');
const $containerTitle = $container.find('.title');
const $containerLink = $container.find('.link');
const $pageLinks = $('a');
const $pageImgs = $('img');

// function: PageScroll
function PageScroll(top) {
  $('html, body').stop().animate({ scrollTop: top }, 200);
}

// sidebar-hover: page-no-scroll
$sidebar.mouseover(() => {
  $('body').addClass('no-scroll-y');
});
$sidebar.mouseout(() => {
  $('body').removeClass('no-scroll-y');
});

// sidebar-title: click
$sidebarTitle.click(() => {
  $('.active').removeClass('active');
  PageScroll(0);
});

// sidebar-menu: build
$containerTitle.each(function(index) {
  const _index = index + 1;
  this.dataset.key = _index;
  $sidebarMenu.append($('<li>').attr('data-key', _index).html(this.innerHTML));
});

// sidebar-menu: click
const $menuItems = $sidebarMenu.find('li');
$menuItems.click(function() {
  const $title = $container.find(`[data-key="${this.dataset.key}"]`);
  const _scrollTop = $title.offset().top - 20;
  // change active style
  $('.active').removeClass('active');
  $(this).addClass('active');
  $title.addClass('active');
  // page scroll
  PageScroll(_scrollTop);
});

// container-title: click
$containerTitle.click(function() {
  const _key = this.dataset.key;
  $sidebar.find(`li[data-key="${_key}"]`).click();
});

// container-link: add '·'
$containerLink.find('a:not(:last)').append('&nbsp;·');

// page-link: add target
$pageLinks.attr('target', '_blank');

// page-img: lazyload
$pageImgs.each(function() {
  this.src = this.dataset.src;
  this.removeAttribute('data-src');
});
