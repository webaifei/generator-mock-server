<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>api列表</title>
	<link rel="stylesheet" type="text/css" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<h1>
			接口列表
		</h1>
		<table class="table">
			<thead>
				<td>接口名</td>
				<td>请求路径</td>
			</thead>
			<tbody>

				<% for(var i=0; i<apiList.length; i++) {%>
					<tr>
						<td><%= apiList[i].name %></td>
				   		<td><%= apiList[i].path %></td>
				   	</tr>
				<% } %>

			</tbody>
		</table>
	</div>
</body>
</html>
