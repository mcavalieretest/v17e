<?php 
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  define("GIT_BRANCH", "hooktest");
?>

<h2>Pulling from git repo.</h2>

<?php 
  try
  {
    $cmd = "git pull origin " + GIT_BRANCH;
    echo "<p>Executing command $cmd...</p>";
    echo "<p>";
    echo shell_exec($cmd);
    echo "</p>";
  }
  catch(Exception $e)
  {
    echo "Exception: <br>";
    print_r($e);
    exit(0);
  }
?>

<?php 
/*
try
{
  if (array_key_exists("payload", $_REQUEST)) {
    $payload = json_decode($_REQUEST['payload']);
    
    if ($payload->ref === 'refs/heads/hooktest') {
      // path to your site deployment script
      echo "<h2>Pulling from git repo...</h2>\n\n";
      echo `git pull origin hooktest`;
    }

  }
}
catch(Exception $e)
{
  echo "Exception: <br>";
  print_r($e);
  exit(0);
}
*/


?>
