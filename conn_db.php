<?php
//Connect to database
	$connectstr_dbhost = '83.212.105.20';
	$connectstr_dbname = 'it21530';
	$connectstr_dbusername = 'it21530';
	$connectstr_dbpassword = 'pa55w0rd';
	$conn = mysqli_connect($connectstr_dbhost, $connectstr_dbusername, $connectstr_dbpassword, $connectstr_dbname);
//If connection fails, display message
	if (!$conn) {
		echo "Error: Unable to connect to MySQL." . PHP_EOL;
		echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
		echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
		exit;
	} else {
		if ( isset($_REQUEST["username"], $_REQUEST["password"]) ) {
			//find customer's info 
			$username = $_REQUEST["username"];
			$password = $_REQUEST["password"];
			$sql = "SELECT * FROM customer WHERE username='". $username. "' AND password='" .$password ."'";
			$result = mysqli_query($conn, $sql);
			if (mysqli_num_rows($result) > 0) {
				$response="Login successfull";	
			} else {
				$response="No such user found.";
			}
			echo $response;
		} elseif ( isset($_REQUEST["licence_plate"], $_REQUEST["username"]) ) {
			//search for vehicle 
			$licence_plate = $_REQUEST["licence_plate"];
			$username = $_REQUEST["username"];
			$sql = "SELECT * FROM customer cust JOIN car c on cust.afm=c.customer_afm WHERE cust.username='".$username."' AND c.licence_plate='".$licence_plate."'";
			$result = mysqli_query($conn, $sql);
			$car_array = array();
			if (mysqli_num_rows($result) > 0) {
				// output data of each row
				while ( $row = mysqli_fetch_assoc($result) ) {
					$car["licence_plate"]=$row["licence_plate"];
					$car["model"]=$row["c_model"];
					$car["fuel_type"]=$row["fuel_type"];
					$car["year"]=$row["c_year"];
					$car["condition"]=$row["c_condition"];
					$car["reward"]=$row["c_reward"];
					$car["worker_id"]=$row["worker_id"];
					$car["customer_afm"]=$row["customer_afm"];
					array_push($car_array, $car);
				}
				$jsonresponse = json_encode($car_array);
				echo $jsonresponse;
			} else {
				$response="No vehicle found with licence plate=" .$licence_plate;
				echo $response;
			}
		} else {
			//create a new customer
			header("Content-Type: application/json; charset=UTF-8");
			$customer = json_decode($_POST["x"], false);
			$sql = "INSERT INTO customer(afm, firstname, lastname, username, password) VALUES(" . $customer->afm . ", '" . $customer->firstname . "', '" . $customer->lastname . "', '" . $customer->username ."', '" . $customer->passwd  . "')";
			if (mysqli_query($conn, $sql)) {
				$message="Customer saved successfully";
			} else {
				$message="Error while inserting customer: " .$customer->afm ."<br>";
			}
			$jsonresponse=json_encode($message);
			echo $jsonresponse;
		}
	}
	//Close connection
	mysqli_close($conn);
?>