<?php

namespace App\Enums;

enum VendorStatusEnum: string
{
    case Pending = 'pending';

    case Approved = 'approved';

    case Rejected = 'rejected';
}
