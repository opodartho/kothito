var $html = $('html');
var $body = $('body');


$(window).on('load',function(){
    var rtl;
    var compactMenu = true; // Set it to true, if you want default menu to be compact

    if($('html').data('textdirection') == 'rtl'){
        rtl = true;
    }

    setTimeout(function(){
        $html.removeClass('loading').addClass('loaded');
    }, 1200);

    $.app.menu.init(compactMenu);

    // Navigation configurations
    var config = {
        speed: 300 // set speed to expand / collpase menu
    };
    if($.app.nav.initialized === false){
        $.app.nav.init(config);
    }

    Unison.on('change', function(bp) {
        $.app.menu.change();
    });

    // Tooltip Initialization
    $('[data-toggle="tooltip"]').tooltip({
        container:'body'
    });

    // Top Navbars - Hide on Scroll
    if ($(".navbar-hide-on-scroll").length > 0) {
        $(".navbar-hide-on-scroll.fixed-top").headroom({
          "offset": 205,
          "tolerance": 5,
          "classes": {
              // when element is initialised
            initial : "headroom",
            // when scrolling up
            pinned : "headroom--pinned-top",
            // when scrolling down
            unpinned : "headroom--unpinned-top",
          }
        });
        // Bottom Navbars - Hide on Scroll
        $(".navbar-hide-on-scroll.fixed-bottom").headroom({
          "offset": 205,
          "tolerance": 5,
          "classes": {
              // when element is initialised
            initial : "headroom",
            // when scrolling up
            pinned : "headroom--pinned-bottom",
            // when scrolling down
            unpinned : "headroom--unpinned-bottom",
          }
        });
    }

    // Toggle fullscreen
    $('a[data-action="expand"]').on('click',function(e){
        e.preventDefault();
        $(this).closest('.card').find('[data-action="expand"] i').toggleClass('ft-maximize ft-minimize');
        $(this).closest('.card').toggleClass('card-fullscreen');
    });

    // Add open class to parent list item if subitem is active except compact menu
    var menuType = $body.data('menu');
    if(menuType != 'horizontal-menu' && compactMenu === false ){
        if( $body.data('menu') == 'vertical-menu-modern' ){
            if( localStorage.getItem("menuLocked") === "true"){
                $(".main-menu-content").find('li.active').parents('li').addClass('open');
            }
        }
        else{
            $(".main-menu-content").find('li.active').parents('li').addClass('open');
        }
    }
    if(menuType == 'horizontal-menu'){
        $(".main-menu-content").find('li.active').parents('li:not(.nav-item)').addClass('open');
        $(".main-menu-content").find('li.active').parents('li').addClass('active');
    }

    //card heading actions buttons small screen support
    $(".heading-elements-toggle").on("click",function(){
        $(this).parent().children(".heading-elements").toggleClass("visible");
    });

    $('.nav-link-search').on('click',function(){
        var $this = $(this),
        searchInput = $(this).siblings('.search-input');

        if(searchInput.hasClass('open')){
            searchInput.removeClass('open');
        }
        else{
            searchInput.addClass('open');
        }
    });
});


$(document).on('click', '.menu-toggle, .modern-nav-toggle', function(e) {
    e.preventDefault();

    // Toggle menu
    $.app.menu.toggle();

    setTimeout(function(){
        $(window).trigger( "resize" );
    },200);

    if($('#collapsed-sidebar').length > 0){
        setTimeout(function(){
            if($body.hasClass('menu-expanded') || $body.hasClass('menu-open')){
                $('#collapsed-sidebar').prop('checked', false);
            }
            else{
                $('#collapsed-sidebar').prop('checked', true);
            }
        },1000);
    }

    return false;
});

/*$('.modern-nav-toggle').on('click',function(){
    var $this = $(this),
    icon = $this.find('.toggle-icon').attr('data-ticon');

    if(icon == 'ft-toggle-right'){
        $this.find('.toggle-icon').attr('data-ticon','ft-toggle-left')
        .removeClass('ft-toggle-right').addClass('ft-toggle-left');
    }
    else{
        $this.find('.toggle-icon').attr('data-ticon','ft-toggle-right')
        .removeClass('ft-toggle-left').addClass('ft-toggle-right');
    }

    $.app.menu.toggle();
});*/

$(document).on('click', '.open-navbar-container', function(e) {

    var currentBreakpoint = Unison.fetch.now();

    // Init drilldown on small screen
    $.app.menu.drillDownMenu(currentBreakpoint.name);

    // return false;
});

$(document).on('click', '.main-menu-footer .footer-toggle', function(e) {
    e.preventDefault();
    $(this).find('i').toggleClass('pe-is-i-angle-down pe-is-i-angle-up');
    $('.main-menu-footer').toggleClass('footer-close footer-open');
    return false;
});

// Add Children Class
$('.navigation').find('li').has('ul').addClass('has-sub');

$('.carousel').carousel({
  interval: 2000
});

// Page full screen
$('.nav-link-expand').on('click', function(e) {
    if (typeof screenfull != 'undefined'){
        if (screenfull.enabled) {
            screenfull.toggle();
        }
    }
});
if (typeof screenfull != 'undefined'){
    if (screenfull.enabled) {
        $(document).on(screenfull.raw.fullscreenchange, function(){
            if(screenfull.isFullscreen){
                $('.nav-link-expand').find('i').toggleClass('ft-minimize ft-maximize');
            }
            else{
                $('.nav-link-expand').find('i').toggleClass('ft-maximize ft-minimize');
            }
        });
    }
}

$(document).on('click', '.mega-dropdown-menu', function(e) {
    e.stopPropagation();
});

// Update manual scroller when window is resized
$(window).resize(function() {
    $.app.menu.manualScroller.updateHeight();
});

// TODO : Tabs dropdown fix, remove this code once fixed in bootstrap 4.
$('.nav.nav-tabs a.dropdown-item').on('click',function(){
    var $this = $(this),
    href = $this.attr('href');
    var tabs = $this.closest('.nav');
    tabs.find('.nav-link').removeClass('active');
    $this.closest('.nav-item').find('.nav-link').addClass('active');
    $this.closest('.dropdown-menu').find('.dropdown-item').removeClass('active');
    $this.addClass('active');
    tabs.next().find(href).siblings('.tab-pane').removeClass('active in').attr('aria-expanded',false);
    $(href).addClass('active in').attr('aria-expanded','true');
});

$('#sidebar-page-navigation').on('click', 'a.nav-link', function(e){
    e.preventDefault();
    e.stopPropagation();
    var $this = $(this),
    href= $this.attr('href');
    var offset = $(href).offset();
    var scrollto = offset.top - 80; // minus fixed header height
    $('html, body').animate({scrollTop:scrollto}, 0);
    setTimeout(function(){
        $this.parent('.nav-item').siblings('.nav-item').children('.nav-link').removeClass('active');
        $this.addClass('active');
    }, 100);
});

