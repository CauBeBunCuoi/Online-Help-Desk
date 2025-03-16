using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using OnlineHelpDesk_BE.DataAccess.Entities;

namespace OnlineHelpDesk_BE.DataAccess.Data;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Area> Areas { get; set; }

    public virtual DbSet<AssigneeFacilityMajorAssignment> AssigneeFacilityMajorAssignments { get; set; }

    public virtual DbSet<BlacklistRequest> BlacklistRequests { get; set; }

    public virtual DbSet<BlacklistedFacilityMajor> BlacklistedFacilityMajors { get; set; }

    public virtual DbSet<Facility> Facilities { get; set; }

    public virtual DbSet<FacilityItem> FacilityItems { get; set; }

    public virtual DbSet<FacilityItemAssignment> FacilityItemAssignments { get; set; }

    public virtual DbSet<FacilityMajor> FacilityMajors { get; set; }

    public virtual DbSet<FacilityMajorType> FacilityMajorTypes { get; set; }

    public virtual DbSet<Faq> Faqs { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<JobType> JobTypes { get; set; }

    public virtual DbSet<Report> Reports { get; set; }

    public virtual DbSet<ReportType> ReportTypes { get; set; }

    public virtual DbSet<RequestStatus> RequestStatuses { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Room> Rooms { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<ServiceAvailability> ServiceAvailabilities { get; set; }

    public virtual DbSet<ServiceRequest> ServiceRequests { get; set; }

    public virtual DbSet<ServiceType> ServiceTypes { get; set; }

    public virtual DbSet<TaskRequest> TaskRequests { get; set; }

    public virtual DbSet<WorkAssignment> WorkAssignments { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=HAOHA\\SQLEXPRESS;Database=OnlineHelpDeskDB;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Account__3213E83F468C3FD1");

            entity.ToTable("Account");

            entity.HasIndex(e => e.Email, "UQ__Account__AB6E6164C94B4641").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.DateOfBirth).HasColumnName("dateOfBirth");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .HasColumnName("fullName");
            entity.Property(e => e.IsDeactivated).HasColumnName("isDeactivated");
            entity.Property(e => e.JobTypeId).HasColumnName("jobTypeId");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.RoleId).HasColumnName("roleId");

            entity.HasOne(d => d.JobType).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.JobTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Account__jobType__5070F446");

            entity.HasOne(d => d.Role).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Account__roleId__4F7CD00D");
        });

        modelBuilder.Entity<Area>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Area__3213E83F62C68CCA");

            entity.ToTable("Area");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FacilityId).HasColumnName("facilityId");
            entity.Property(e => e.FacilityMajorId).HasColumnName("facilityMajorId");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");

            entity.HasOne(d => d.Facility).WithMany(p => p.Areas)
                .HasForeignKey(d => d.FacilityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Area__facilityId__60A75C0F");

            entity.HasOne(d => d.FacilityMajor).WithMany(p => p.Areas)
                .HasForeignKey(d => d.FacilityMajorId)
                .HasConstraintName("FK__Area__facilityMa__619B8048");
        });

        modelBuilder.Entity<AssigneeFacilityMajorAssignment>(entity =>
        {
            entity.HasKey(e => new { e.AssigneeId, e.FacilityMajorId }).HasName("PK__Assignee__2D95AB13949F1D83");

            entity.ToTable("AssigneeFacilityMajorAssignment");

            entity.Property(e => e.AssigneeId).HasColumnName("assigneeId");
            entity.Property(e => e.FacilityMajorId).HasColumnName("facilityMajorId");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.IsHead).HasColumnName("isHead");

            entity.HasOne(d => d.Assignee).WithMany(p => p.AssigneeFacilityMajorAssignments)
                .HasForeignKey(d => d.AssigneeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__AssigneeF__assig__68487DD7");

            entity.HasOne(d => d.FacilityMajor).WithMany(p => p.AssigneeFacilityMajorAssignments)
                .HasForeignKey(d => d.FacilityMajorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__AssigneeF__facil__693CA210");
        });

        modelBuilder.Entity<BlacklistRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Blacklis__3213E83FB0A4BF2B");

            entity.ToTable("BlacklistRequest");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.RequestStatusId).HasColumnName("requestStatusId");
            entity.Property(e => e.RequesterId).HasColumnName("requesterId");
            entity.Property(e => e.TargetId).HasColumnName("targetId");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updatedAt");

            entity.HasOne(d => d.RequestStatus).WithMany(p => p.BlacklistRequests)
                .HasForeignKey(d => d.RequestStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Blacklist__reque__2180FB33");

            entity.HasOne(d => d.Requester).WithMany(p => p.BlacklistRequestRequesters)
                .HasForeignKey(d => d.RequesterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Blacklist__reque__1F98B2C1");

            entity.HasOne(d => d.Target).WithMany(p => p.BlacklistRequestTargets)
                .HasForeignKey(d => d.TargetId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Blacklist__targe__208CD6FA");
        });

        modelBuilder.Entity<BlacklistedFacilityMajor>(entity =>
        {
            entity.HasKey(e => new { e.AccountId, e.FacilityMajorId }).HasName("PK__Blacklis__8D45E5ABBDE8B485");

            entity.ToTable("BlacklistedFacilityMajor");

            entity.Property(e => e.AccountId).HasColumnName("accountId");
            entity.Property(e => e.FacilityMajorId).HasColumnName("facilityMajorId");
            entity.Property(e => e.RestrictPoint).HasColumnName("restrictPoint");

            entity.HasOne(d => d.Account).WithMany(p => p.BlacklistedFacilityMajors)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Blacklist__accou__6FE99F9F");

            entity.HasOne(d => d.FacilityMajor).WithMany(p => p.BlacklistedFacilityMajors)
                .HasForeignKey(d => d.FacilityMajorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Blacklist__facil__70DDC3D8");
        });

        modelBuilder.Entity<Facility>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Facility__3213E83F45455586");

            entity.ToTable("Facility");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.IsDeactivated).HasColumnName("isDeactivated");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<FacilityItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Facility__3213E83FF00592DE");

            entity.ToTable("FacilityItem");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Count).HasColumnName("count");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updatedAt");
        });

        modelBuilder.Entity<FacilityItemAssignment>(entity =>
        {
            entity.HasKey(e => new { e.FacilityItemId, e.RoomId, e.AreaId }).HasName("PK__Facility__C9073D7CC7945340");

            entity.ToTable("FacilityItemAssignment");

            entity.Property(e => e.FacilityItemId).HasColumnName("facilityItemId");
            entity.Property(e => e.RoomId).HasColumnName("roomId");
            entity.Property(e => e.AreaId).HasColumnName("areaId");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.ItemCount).HasColumnName("itemCount");

            entity.HasOne(d => d.Area).WithMany(p => p.FacilityItemAssignments)
                .HasForeignKey(d => d.AreaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FacilityI__areaI__76969D2E");

            entity.HasOne(d => d.FacilityItem).WithMany(p => p.FacilityItemAssignments)
                .HasForeignKey(d => d.FacilityItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FacilityI__facil__74AE54BC");

            entity.HasOne(d => d.Room).WithMany(p => p.FacilityItemAssignments)
                .HasForeignKey(d => d.RoomId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FacilityI__roomI__75A278F5");
        });

        modelBuilder.Entity<FacilityMajor>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Facility__3213E83FB2524D53");

            entity.ToTable("FacilityMajor");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CloseScheduleDate).HasColumnName("closeScheduleDate");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.FacilityMajorTypeId).HasColumnName("facilityMajorTypeId");
            entity.Property(e => e.IsDeactivated).HasColumnName("isDeactivated");
            entity.Property(e => e.IsOpen).HasColumnName("isOpen");
            entity.Property(e => e.MainDescription)
                .HasColumnType("text")
                .HasColumnName("mainDescription");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.OpenScheduleDate).HasColumnName("openScheduleDate");
            entity.Property(e => e.WorkShifstDescription)
                .HasColumnType("text")
                .HasColumnName("workShifstDescription");

            entity.HasOne(d => d.FacilityMajorType).WithMany(p => p.FacilityMajors)
                .HasForeignKey(d => d.FacilityMajorTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FacilityMajor_FacilityMajorType");
        });

        modelBuilder.Entity<FacilityMajorType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Facility__3213E83F0A0773E4");

            entity.ToTable("FacilityMajorType");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Faq>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__FAQ__3213E83F636ECAD3");

            entity.ToTable("FAQ");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Answer)
                .HasColumnType("text")
                .HasColumnName("answer");
            entity.Property(e => e.Question)
                .HasColumnType("text")
                .HasColumnName("question");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Feedback__3213E83FEBAECAA1");

            entity.ToTable("Feedback");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AccountId).HasColumnName("accountId");
            entity.Property(e => e.Content)
                .HasColumnType("text")
                .HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.FacilityMajorId).HasColumnName("facilityMajorId");
            entity.Property(e => e.IsDeactivated).HasColumnName("isDeactivated");
            entity.Property(e => e.IsReplaced).HasColumnName("isReplaced");
            entity.Property(e => e.Rate).HasColumnName("rate");

            entity.HasOne(d => d.Account).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Feedback__accoun__06CD04F7");

            entity.HasOne(d => d.FacilityMajor).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.FacilityMajorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Feedback__facili__07C12930");
        });

        modelBuilder.Entity<JobType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__JobType__3213E83FA9BD26DE");

            entity.ToTable("JobType");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Report>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Report__3213E83F0C20B665");

            entity.ToTable("Report");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AccountId).HasColumnName("accountId");
            entity.Property(e => e.Content)
                .HasColumnType("text")
                .HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.FacilityMajorId).HasColumnName("facilityMajorId");
            entity.Property(e => e.IsResolved).HasColumnName("isResolved");
            entity.Property(e => e.ReportTypeId).HasColumnName("reportTypeId");

            entity.HasOne(d => d.Account).WithMany(p => p.Reports)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Report__accountI__10566F31");

            entity.HasOne(d => d.FacilityMajor).WithMany(p => p.Reports)
                .HasForeignKey(d => d.FacilityMajorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Report__facility__114A936A");

            entity.HasOne(d => d.ReportType).WithMany(p => p.Reports)
                .HasForeignKey(d => d.ReportTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Report__reportTy__0F624AF8");
        });

        modelBuilder.Entity<ReportType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ReportTy__3213E83F58AC723F");

            entity.ToTable("ReportType");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<RequestStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RequestS__3213E83FC1C591B4");

            entity.ToTable("RequestStatus");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Role__3213E83FFA105377");

            entity.ToTable("Role");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Room>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Room__3213E83F2DD8712F");

            entity.ToTable("Room");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FacilityId).HasColumnName("facilityId");
            entity.Property(e => e.FacilityMajorId).HasColumnName("facilityMajorId");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");

            entity.HasOne(d => d.Facility).WithMany(p => p.Rooms)
                .HasForeignKey(d => d.FacilityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Room__facilityId__45BE5BA9");

            entity.HasOne(d => d.FacilityMajor).WithMany(p => p.Rooms)
                .HasForeignKey(d => d.FacilityMajorId)
                .HasConstraintName("FK__Room__facilityMa__5DCAEF64");
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Service__3213E83F3DAFBA77");

            entity.ToTable("Service");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CloseScheduleDate).HasColumnName("closeScheduleDate");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.FacilitymajorId).HasColumnName("facilitymajorId");
            entity.Property(e => e.IsDeactivated).HasColumnName("isDeactivated");
            entity.Property(e => e.IsInitRequestDescriptionRequired).HasColumnName("isInitRequestDescriptionRequired");
            entity.Property(e => e.IsOpen).HasColumnName("isOpen");
            entity.Property(e => e.MainDescription)
                .HasColumnType("text")
                .HasColumnName("mainDescription");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.OpenScheduleDate).HasColumnName("openScheduleDate");
            entity.Property(e => e.RequestInitHintDescription)
                .HasColumnType("text")
                .HasColumnName("requestInitHintDescription");
            entity.Property(e => e.ServiceTypeId).HasColumnName("serviceTypeId");
            entity.Property(e => e.WorkShiftsDescription)
                .HasColumnType("text")
                .HasColumnName("workShiftsDescription");

            entity.HasOne(d => d.Facilitymajor).WithMany(p => p.Services)
                .HasForeignKey(d => d.FacilitymajorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Service__facilit__7E37BEF6");

            entity.HasOne(d => d.ServiceType).WithMany(p => p.Services)
                .HasForeignKey(d => d.ServiceTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Service__service__7F2BE32F");
        });

        modelBuilder.Entity<ServiceAvailability>(entity =>
        {
            entity.HasKey(e => new { e.ServiceId, e.DayOfWeek, e.StartRequestableTime, e.EndRequestableTime }).HasName("PK__ServiceA__4638B5AB22676D3D");

            entity.ToTable("ServiceAvailability");

            entity.Property(e => e.ServiceId).HasColumnName("serviceId");
            entity.Property(e => e.DayOfWeek).HasColumnName("dayOfWeek");
            entity.Property(e => e.StartRequestableTime).HasColumnName("startRequestableTime");
            entity.Property(e => e.EndRequestableTime).HasColumnName("endRequestableTime");

            entity.HasOne(d => d.Service).WithMany(p => p.ServiceAvailabilities)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ServiceAv__servi__02084FDA");
        });

        modelBuilder.Entity<ServiceRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ServiceR__3213E83F9B4B4A8A");

            entity.ToTable("ServiceRequest");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AssignedAssigneeId).HasColumnName("assignedAssigneeId");
            entity.Property(e => e.CancelReason)
                .HasColumnType("text")
                .HasColumnName("cancelReason");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.DateRequest).HasColumnName("dateRequest");
            entity.Property(e => e.IsCancelAutomatically).HasColumnName("isCancelAutomatically");
            entity.Property(e => e.IsSeen)
                .HasDefaultValue(true)
                .HasColumnName("isSeen");
            entity.Property(e => e.ProgressNote)
                .HasColumnType("text")
                .HasColumnName("progressNote");
            entity.Property(e => e.RequestInitDescription)
                .HasColumnType("text")
                .HasColumnName("requestInitDescription");
            entity.Property(e => e.RequestResultDescription)
                .HasColumnType("text")
                .HasColumnName("requestResultDescription");
            entity.Property(e => e.RequestStatusId).HasColumnName("requestStatusId");
            entity.Property(e => e.RequesterId).HasColumnName("requesterId");
            entity.Property(e => e.ServiceId).HasColumnName("serviceId");
            entity.Property(e => e.TimeRequest).HasColumnName("timeRequest");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updatedAt");

            entity.HasOne(d => d.AssignedAssignee).WithMany(p => p.ServiceRequestAssignedAssignees)
                .HasForeignKey(d => d.AssignedAssigneeId)
                .HasConstraintName("FK__ServiceRe__assig__1CBC4616");

            entity.HasOne(d => d.RequestStatus).WithMany(p => p.ServiceRequests)
                .HasForeignKey(d => d.RequestStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ServiceRe__reque__1BC821DD");

            entity.HasOne(d => d.Requester).WithMany(p => p.ServiceRequestRequesters)
                .HasForeignKey(d => d.RequesterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ServiceRe__reque__1AD3FDA4");

            entity.HasOne(d => d.Service).WithMany(p => p.ServiceRequests)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ServiceRe__servi__19DFD96B");
        });

        modelBuilder.Entity<ServiceType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ServiceT__3213E83FBF0558F4");

            entity.ToTable("ServiceType");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<TaskRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TaskRequ__3213E83FFBFF1604");

            entity.ToTable("TaskRequest");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CancelReason)
                .HasColumnType("text")
                .HasColumnName("cancelReason");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.FacilityMajorId).HasColumnName("facilityMajorId");
            entity.Property(e => e.RequestStatusId).HasColumnName("requestStatusId");
            entity.Property(e => e.RequesterId).HasColumnName("requesterId");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updatedAt");

            entity.HasOne(d => d.FacilityMajor).WithMany(p => p.TaskRequests)
                .HasForeignKey(d => d.FacilityMajorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TaskReque__facil__151B244E");

            entity.HasOne(d => d.RequestStatus).WithMany(p => p.TaskRequests)
                .HasForeignKey(d => d.RequestStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TaskReque__reque__160F4887");

            entity.HasOne(d => d.Requester).WithMany(p => p.TaskRequests)
                .HasForeignKey(d => d.RequesterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TaskReque__reque__14270015");
        });

        modelBuilder.Entity<WorkAssignment>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("WorkAssignment");

            entity.Property(e => e.AreaId).HasColumnName("areaId");
            entity.Property(e => e.AssigneeId).HasColumnName("assigneeId");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.RoomId).HasColumnName("roomId");
            entity.Property(e => e.WorkDescription)
                .HasMaxLength(255)
                .HasColumnName("workDescription");

            entity.HasOne(d => d.Area).WithMany()
                .HasForeignKey(d => d.AreaId)
                .HasConstraintName("FK__WorkAssig__areaI__6D0D32F4");

            entity.HasOne(d => d.Assignee).WithMany()
                .HasForeignKey(d => d.AssigneeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WorkAssig__assig__6B24EA82");

            entity.HasOne(d => d.Room).WithMany()
                .HasForeignKey(d => d.RoomId)
                .HasConstraintName("FK__WorkAssig__roomI__6C190EBB");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
