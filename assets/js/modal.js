$(function(){
  'use strict';
  let modalHolderSelector= '#modal-holder'
  let modalSelector = '.modal'
  window.Modalize = window.Modalize || {}

  let appendQueryString = (url, queryVars) => {
      let firstSeperator = (url.indexOf('?')==-1 ? '?' : '&');
      let queryStringParts = new Array();
      for(let key in queryVars) {
          queryStringParts.push(key + '=' + queryVars[key]);
      }
      let queryString = queryStringParts.join('&');
      return url + firstSeperator + queryString;
  }

  $(document).on('click', 'a[data-modal]', (event) => {
    event.preventDefault()
    let location = $(event.target).attr('href')
    // adding media type modal into url
    location = appendQueryString(location, {'_format': 'modal'})
    $.get(location, (data) => {
      $(modalHolderSelector).html(data).
        find(modalSelector).modal({backdrop: 'static'})
    })
  })

  $(document).
    on('ajax:success', 'form[data-modal]', (event, data, status, xhr) => {
      let url = xhr.getResponseHeader('Location')
      if(url) {
        window.location = url
      } else {
        $('.modal-backdrop').remove()
        $(modalHolderSelector).html(data).
          find(modalSelector).modal()
      }
  })

  window.Modalize.modal = (url) => {
    let $anchor = $(`<a href="${url}" data-modal="true"></a>`)
    $(modalHolderSelector).append($anchor)
    $anchor.click()
  }
});
