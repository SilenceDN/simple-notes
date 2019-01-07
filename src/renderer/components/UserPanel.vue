<style scoped>
.head {
  width: 80px;
  height: 80px;
  margin: 8px auto;
}
section {
  font-size: 15px;
}
.anticon {
  color: #2f80ff;
  margin-right: 6px;
}
ul {
  margin-top: 6px;
}
li {
  padding: 4px 8px;
  vertical-align: bottom;
  cursor: pointer;
  transition: all 0.1s;
}
li a {
  color: gray;
}
li a:hover {
  color: #2f80ff;
}
li:hover {
  background: #252627;
}
li:hover a {
  color: #2f80ff;
}
</style>

<template>
  <section>
    <div class="head">
      <a-avatar :size="80" icon="user"/>
    </div>
    <ul>
      <li>
        <a-icon type="login"/>
        <a>Logout</a>
      </li>
      <li>
        <a-icon type="file"/>
        <a>New</a>
      </li>
      <li>
        <a-icon type="sync"/>
        <a>Sync</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      menus: [
        { title: "Login", Icon: "" },
        { title: "Login" },
        { title: "Login" }
      ]
    };
  }
};
</script>

