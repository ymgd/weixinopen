<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<style lang="css">
@import "./assets/css/reset.css";
html {
	font-size: 100px;
}	
body {
	font-size: 16px;
	background-color: #f2f3f8;
}
html, body {
	width: 100%;
	height: 100%;
}
.max-width {
  max-width: 16rem;
  margin: 0 auto;
  padding: 0 .2rem;
}
a:hover{
  text-decoration: none;
}
</style>