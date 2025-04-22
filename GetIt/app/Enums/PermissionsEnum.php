<?php

namespace App;

enum PermissionsEnum: string
{
    case ApproveVendors = 'ApproveVendors';
    case SellProducts = 'SellProducts';
    case BuyProducts = 'BuyProducts';
}
