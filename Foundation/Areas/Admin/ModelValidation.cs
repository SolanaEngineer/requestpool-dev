﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Foundation.Areas.Admin
{
    public static class ModelValidation
    {
        public const string PublicUserActivationCode = "(?=^.{0,10}$|^$)";

    }
}