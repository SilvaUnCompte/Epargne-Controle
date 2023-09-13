<?php
  if(session_status() !== PHP_SESSION_ACTIVE) session_start();
  if(session_destroy())
  {
    header("Location: /controler/pages/index.php");
  }