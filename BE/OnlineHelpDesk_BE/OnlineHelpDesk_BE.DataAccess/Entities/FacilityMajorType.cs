using System;
using System.Collections.Generic;

namespace OnlineHelpDesk_BE.DataAccess.Entities;

public partial class FacilityMajorType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<FacilityMajor> FacilityMajors { get; set; } = new List<FacilityMajor>();
}
