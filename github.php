<?php 
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
?>

<h2>_REQUEST stuff</h2>

<?php 
if (isset($_POST))
{
   echo "it's set!<br>";
  // param was set in the query string
   if(empty($_POST))
   {
     echo "It's empty!<br>";
     // query string had param set to nothing ie ?param=&param2=something
   } else {
    echo "wow, it's not empty. Ain't that some shizzle.<br>";
   }
} else {
  echo "It's not even set!<br>";
} 
?>

<h2>Output: </h2>

<?php 
try
{
  if (array_key_exists("payload", $_REQUEST)) {
    $payload = json_decode($_REQUEST['payload']);
    
    if ($payload->ref === 'refs/heads/hooktest') {
      // path to your site deployment script
      echo "<h2>Pulling from git repo...</h2>\n\n";
      echo exec('git pull origin stripped');
    }

  }
}
catch(Exception $e)
{
  echo "Exception: <br>";
  print_r($e);
  exit(0);
}



?>


<h2>Request: </h2>

<?php print_r($_REQUEST); ?>

<h2>POST: </h2>

<?php print_r($_POST); ?>
