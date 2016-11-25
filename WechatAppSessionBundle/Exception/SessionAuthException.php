<?php

namespace WechatApp\SessionBundle\Exception;


class SessionAuthException extends \Exception
{
    public function __construct($reason = '', array $additional = [])
    {
        if (isset($additional['reason'])) {
            unset($additional['reason']);
        }

        if (isset($additional['hasError'])) {
            unset($additional['hasError']);
        }

        $error = array_merge([
            'hasError' => true,
            'reason' => $reason
        ], $additional);

        $this->message = json_encode($error);
    }
}