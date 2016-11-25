<?php

namespace WechatApp\SessionBundle\EventListener;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use WechatApp\SessionBundle\Exception\SessionAuthException;

class SessionAuthExceptionListener
{
    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        $exception = $event->getException();

        if ($exception instanceof SessionAuthException) {
            $response = new Response($exception->getMessage());
            $response->headers->set('Content-Type', 'application/json');
            $event->setResponse($response);
        }
    }
}