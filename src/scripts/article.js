// Article
// --------------------------

// elements
const $header = $('.page-header');
const $headerLogo = $('.logo');
const $headerNav = $('.nav');
const $headerDropdown = $('.dropdown');
const $sidebar = $('.page-sidebar');
const $sidebarMenu = $('#menu');
const $container = $('.page-container');
const $containerTitle = $container.find(':header');
const $containerLinks = $container.find('a');
const $pageCode = $('pre');
const $pageImgs = $('img');
const $pageTable = $('table');
const $pageDialog = $('.dialog');

// function: PageScroll
function PageScroll($title) {
  // set scrollTop
  let _scrollTop = 0;
  if ($title) {
    const _marginTop = $title.css('margin-top') || $title.parent().css('margin-top');
    _scrollTop = $title.offset().top - $header.height() - Number(_marginTop.replace('px', ''));
  }
  // page scroll
  $('body, html').animate({ scrollTop: _scrollTop || 0 }, 200);
}

// page: add wrap
$header.wrap('<div class="page-header-wrap">');
$sidebar.wrap('<div class="page-sidebar-wrap">');
$container.wrap('<div class="page-container-wrap">');
const $sidebarWrap = $('.page-sidebar-wrap');

// header-logo: click
$headerLogo.click(() => {
  PageScroll();
  // menu reset
  $('.active').removeClass('active');
  $menuRoot.children('.close').attr('class', 'open');
  $menuSub.children('.open').attr('class', 'close');
  $menuSub.stop().slideDown(200);
  $menuLast.stop().slideUp(200);
});

// header-nav: add home
$headerNav.prepend('<li><a href="../index.html"><i class="fa fa-home"></i>&nbsp;首页</a></li>');

// header-dropdown: add class
$headerDropdown.parent('li').addClass('with-dropdown');

// header-link: add attr
$header.find('a').attr('target', '_blank');

// sidebar-hover: page-no-scroll
$sidebar.mouseover(() => {
  $('body').addClass('no-scroll-y');
});
$sidebar.mouseout(() => {
  $('body').removeClass('no-scroll-y');
});

// sidebar-menu: build
let _index1 = 0;
let _index2 = 0;
let _index3 = 0;
let _id1;
let _id12;
let _id123;
$container.find('h1,h2,h3').each(function(index1) {
  if (this.tagName === 'H1') {
    // level-1
    _index1 += 1;
    _index2 = 0;
    _index3 = 0;
    _id1 = _index1;
    this.dataset.key = _id1;
    $sidebarMenu.append($('<li>').attr('data-key', _id1).html(`<a>${this.innerText}</a><ul class="menu-sub"></ul>`));
  } else if (this.tagName === 'H2') {
    // level-2
    _index2 += 1;
    _index3 = 0;
    _id12 = `${_id1}-${_index2}`;
    this.dataset.key = _id12;
    $sidebar
      .find(`li[data-key="${_id1}"]`)
      .children('.menu-sub')
      .append($('<li>').attr('data-key', _id12).html(`<a>${this.innerText}</a><ul class="menu-last"></ul>`));
  } else if (this.tagName === 'H3') {
    // level-3
    _index3 += 1;
    _id123 = `${_id12}-${_index3}`;
    this.dataset.key = _id123;
    $sidebar
      .find(`li[data-key="${_id12}"]`)
      .children('.menu-last')
      .append($('<li>').attr('data-key', _id123).html(`<a>${this.innerText}</a>`));
  }
});

// sidebar-menu: elements
const $menuRoot = $('.menu-root');
const $menuSub = $('.menu-sub');
const $menuLast = $('.menu-last');

// sidebar-menu-item: add icon
$menuRoot.find('li').each(function() {
  const $item = $(this);
  const $link = $item.children('a');
  const $ul = $item.children('ul');
  const $ulType = $ul.attr('class');
  const $ulLength = $ul.children().length;
  switch ($ulType) {
    // level-1
    case 'menu-sub':
      if ($ulLength > 0) {
        $item.addClass('open');
        $link.prepend('<i class="fa"></i>');
      } else {
        $ul.remove();
      }
      break;
    // level-2
    case 'menu-last':
      if ($ulLength > 0) {
        $item.addClass('close');
        $link.prepend('<i class="fa"></i>');
      } else {
        $ul.remove();
      }
      break;
    default:
      break;
  }
});

// sidebar-menu-icon: click
$menuRoot.find('.fa').click(function(e) {
  const $icon = $(this);
  const $parentLi = $icon.closest('li');
  const $nextUl = $parentLi.children('ul');
  // icon toggle
  $parentLi.toggleClass('open').toggleClass('close');
  // menu toggle
  $nextUl.stop().slideToggle(200);
  e.stopPropagation();
});

// sidebar-menu-link: click
$menuRoot.find('a').click(function() {
  // menu set
  MenuActive($(this));
  // page scroll
  const _key = this.parentElement.dataset.key;
  if (_key) {
    const $title = $container.find(`[data-key="${_key}"]`);
    PageScroll($title);
  }
});

// container-title: click
$containerTitle.click(function() {
  // menu
  const _key = this.dataset.key;
  if (_key) {
    // set
    const $link = $sidebar.find(`li[data-key="${_key}"]`).children('a');
    MenuActive($link);
    // scroll
    const _positionTop = $sidebarWrap.css('top').replace('px', '');
    const _scrollTop = $sidebar.scrollTop() + $link.offset().top - _positionTop - 100;
    $sidebar.animate({ scrollTop: _scrollTop }, 200);
  }
  // page scroll
  PageScroll($(this));
});

// function: MenuActive
function MenuActive($link) {
  const $oldActiveLinks = $menuRoot.find('.active');
  const $newActiveLinks = $link.parents('li').children('a');
  const $closedParents = $link.parents('.close');
  // change active style
  $oldActiveLinks.removeClass('active');
  $newActiveLinks.addClass('active');
  // change icon
  $closedParents.attr('class', 'open');
  // menu slide
  $closedParents.children('ul').stop().slideDown(200);
}

// container-link: add attr/icon
$containerLinks.not('[data-block], [data-dialog]').attr('target', '_blank').append('&nbsp;<i class="fa fa-external-link"></i>');

// container-link: click
$containerLinks.click(e => {
  e.stopPropagation();
});

// page-table: add wrap
$pageTable.each(function() {
  const _height = this.dataset.height;
  if (_height) {
    $(this).wrap(`<div class="table-scrollable" style="height: ${_height};">`).after('<div class="table-loadmore"></div>');
  } else {
    $(this).wrap('<div class="table-scrollable">');
  }
});

// page-table: click loadmore
$('.table-loadmore').click(function() {
  $(this).parent('.table-scrollable').css('height', 'auto');
  $(this).remove();
});

// page-block: toggle
$('[data-block]').click(function() {
  const _id = this.dataset.block;
  $(_id).slideToggle(200);
});

// page-dialog: build
$pageDialog.each(function() {
  this.innerHTML = `<div class="content"><div class="header"><span class="title">${this.title}</span><span class="close">×</span></div><div class="body">${this.innerHTML}</div></div>`;
});

// page-dialog: open
$('[data-dialog]').click(function() {
  const _id = this.dataset.dialog;
  $(_id).fadeIn(200);
  $('body').addClass('no-scroll-y');
});

// page-dialog: close
$pageDialog.click(() => {
  $pageDialog.fadeOut(200);
  $('body').removeClass('no-scroll-y');
});
$pageDialog.find('.close').click(() => {
  $pageDialog.fadeOut(200);
  $('body').removeClass('no-scroll-y');
});
$pageDialog.find('.content').click(e => {
  e.stopPropagation();
});

// page-code: init highlight.js
hljs.highlightAll();

// page-code: add wrap
$pageCode.each(function() {
  const _class = this.children[0].classList[0] || 'code';
  const _language = _class.toUpperCase();
  $(this).wrap('<figure>');
  $(this).before(`<figcaption><span class="left-bar"><i class="fa fa-times-circle"></i><i class="fa fa-minus-circle"></i><i class="fa fa-plus-circle"></i></span><span class="right-bar"><i class="lang">${_language}</i><i class="fa fa-code"></i></span></figcaption>`);
});

// page-img: lazyload
$pageImgs.each(function() {
  this.src = this.dataset.src;
  this.removeAttribute('data-src');
});

// page-handle: add
$('body').prepend(`
  <div class="page-handle">
    <span class="fa fa-angle-up" onclick="PageScroll()"></span>
    <span class="fa fa-angle-left"></span>
  </div>`);

// page-handle: menu toggle
$('.page-handle .fa-angle-left').on('click', () => {
  $('body').toggleClass('without-menu');
});
