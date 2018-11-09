<template>
    <div>
        登录中...
    </div>
</template>
<script>
    import mvueCore from "mvue-toolkit";
    export default {
        data() {
            return {

            }
        },
        mounted() {
            var _self = this;
            if (_self.$route.query["logout"] == "1") {
                mvueCore.session.doLogout(window.location.protocol + window.location.host + window.location.pathname);
                return;
            }
            mvueCore.ssoclient.onSSOCallback(function (tokenInfo) {
                mvueCore.session.doSignIn(tokenInfo);
                var returnTo = _self.$route.query["returnUrl"];
                if (_.startsWith(returnTo, "http")) {
                    window.location = returnTo;
                } else {
                    _self.$router.push({ path: returnTo });
                }
            });

        }
    }
</script>