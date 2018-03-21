<template>
<div id="main">
    <div>
        <profilePicture></profilePicture>
    </div>
</div>

</template>

<style>
   #main {
       width: 20%;
       height: inherit;
       text-align: center;
       background: #f8f9fa;
       padding: 20px;
   }
</style>
<script>
import profilePicture from 'components/profilePicture';

export default {
    components: {
        profilePicture
    },
    data() {
        return {
            activeLink: null
        };
    },
    events: {
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.activeLink = to.path
            })
        },
        beforeRouteUpdate (to, from, next) {
            this.activeLink = to.path;
            next()
        },
    }
};
</script>
