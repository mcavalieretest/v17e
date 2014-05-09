<?php 
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
?>

<h2>Output: </h2>

<?php 
try
{
  if (array_key_exists("payload", $_REQUEST)) {
    echo "Payload: <br>";
    $payload = json_decode($_REQUEST['payload']);
    print_r($payload);
}
catch(Exception $e)
{
  echo "Exception: <br>";
  print_r($e);
  exit(0);
}

/*

if ($payload->ref === 'refs/heads/master')
{
  // path to your site deployment script
  // exec('./build.sh');
}
*/
?>

