<template>
  <div id="wrapper">
    <a-layout>
      <a-layout-sider width="140">
        <Sider/>
      </a-layout-sider>
      <a-layout-sider width="230">Sider</a-layout-sider>
      <a-layout>
        <a-layout-header>Header</a-layout-header>
        <a-layout-content>Content</a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Sider from "@/components/Sider";
export default {
  name: "landing-page",
  components: { Sider },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#wrapper > .ant-layout {
  height: 100vh;
}
#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  width: 100vw;
}

#wrapper .ant-layout-sider:nth-child(1) {
  color: hsla(0, 0%, 100%, 0.65);
  background: #323237
}
#wrapper .ant-layout-sider:nth-child(2) {
  background: #f0f2f5;
  box-shadow: rgba(55, 55, 55, 0.08) 7px 0px 7px -7px;
  z-index: 1;
}
#wrapper .ant-layout-header,
.ant-layout-content {
  background: #f6f5f6;
  position: relative;
}
#wrapper .ant-layout-header {
  padding: 12px 15px;
  height: 50px;
  line-height: inherit;
  z-index: 1;
}
#wrapper .ant-layout-header::after {
  content: "";
  position: absolute;
  height: 7px;
  bottom: -7px;
  left: 0;
  right: 0;
  box-shadow: rgba(55, 55, 55, 0.3) 0 7px 7px -7px inset;
}
</style>
