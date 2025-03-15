﻿using System;
using System.Collections.Generic;

namespace OnlineHelpDesk_BE.DataAccess.Entities;

public partial class ServiceAvailability
{
    public int ServiceId { get; set; }

    public byte DayOfWeek { get; set; }

    public TimeOnly StartRequestableTime { get; set; }

    public TimeOnly EndRequestableTime { get; set; }

    public virtual Service Service { get; set; } = null!;
}
