const cookieFn = {
    //设置cookie
    setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        exdays = exdays || 3;
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + '; ' + expires;
    },
    //获取cookie
    getCookie: function(cname) {
        var name = cname + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
        }
        return '';
    },
    //清除cookie
    clearCookie: function(name) {
        this.setCookie(name, "", -1);
    },
    clearAllCookie: function(_arr) {
        for (var i = 0; i < _arr.length; i++) {
            this.setCookie(_arr[i], "", -1);
        }
    }
}
export default cookieFn;
