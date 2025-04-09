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

    public virtual DbSet<AssigneeFacilityMajorAssignment> AssigneeFacilityMajorAssignments { get; set; }

    public virtual DbSet<Facility> Facilities { get; set; }

    public virtual DbSet<FacilityItem> FacilityItems { get; set; }

    public virtual DbSet<FacilityItemAssignment> FacilityItemAssignments { get; set; }

    public virtual DbSet<FacilityMajor> FacilityMajors { get; set; }

    public virtual DbSet<FacilityMajorType> FacilityMajorTypes { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<JobType> JobTypes { get; set; }

    public virtual DbSet<Report> Reports { get; set; }

    public virtual DbSet<ReportType> ReportTypes { get; set; }

    public virtual DbSet<RequestStatus> RequestStatuses { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<ServiceAvailability> ServiceAvailabilities { get; set; }

    public virtual DbSet<ServiceRequest> ServiceRequests { get; set; }

    public virtual DbSet<ServiceType> ServiceTypes { get; set; }

    public virtual DbSet<TaskRequest> TaskRequests { get; set; }

//     protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//         => optionsBuilder.UseSqlServer("Server=HAOHA\\SQLEXPRESS;Database=OnlineHelpDeskDB;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Account__3213E83F1DAA0D34");

            entity.ToTable("Account");

            entity.HasIndex(e => e.Email, "UQ__Account__AB6E6164A507CF33").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address).HasColumnName("address");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.DateOfBirth).HasColumnName("dateOfBirth");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FullName).HasColumnName("fullName");
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

        modelBuilder.Entity<AssigneeFacilityMajorAssignment>(entity =>
        {
            entity.HasKey(e => new { e.AccountId, e.FacilityMajorId }).HasName("PK__Assignee__8D45E5ABFA52142B");

            entity.ToTable("AssigneeFacilityMajorAssignment");

            entity.Property(e => e.AccountId).HasColumnName("accountId");
            entity.Property(e => e.FacilityMajorId).HasColumnName("facilityMajorId");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.IsHead).HasColumnName("isHead");
            entity.Property(e => e.WorkDescription).HasColumnName("workDescription");

            entity.HasOne(d => d.Account).WithMany(p => p.AssigneeFacilityMajorAssignments)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__AssigneeF__accou__17036CC0");

            entity.HasOne(d => d.FacilityMajor).WithMany(p => p.AssigneeFacilityMajorAssignments)
                .HasForeignKey(d => d.FacilityMajorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__AssigneeF__facil__17F790F9");
        });

        modelBuilder.Entity<Facility>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Facility__3213E83FAC547D1E");

            entity.ToTable("Facility");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.IsDeactivated).HasColumnName("isDeactivated");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<FacilityItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Facility__3213E83F3B885A86");

            entity.ToTable("FacilityItem", tb => tb.HasTrigger("trg_UpdateUpdatedAt_FacilityItem"));

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Count).HasColumnName("count");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updatedAt");
        });

        modelBuilder.Entity<FacilityItemAssignment>(entity =>
        {
            entity.HasKey(e => new { e.FacilityItemId, e.FacilityMajorId }).HasName("PK__Facility__16B4D1FE83B6820B");

            entity.ToTable("FacilityItemAssignment");

            entity.Property(e => e.FacilityItemId).HasColumnName("facilityItemId");
            entity.Property(e => e.FacilityMajorId).HasColumnName("facilityMajorId");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.ItemCount).HasColumnName("itemCount");

            entity.HasOne(d => d.FacilityItem).WithMany(p => p.FacilityItemAssignments)
                .HasForeignKey(d => d.FacilityItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FacilityI__facil__66603565");

            entity.HasOne(d => d.FacilityMajor).WithMany(p => p.FacilityItemAssignments)
                .HasForeignKey(d => d.FacilityMajorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FacilityI__facil__6754599E");
        });

        modelBuilder.Entity<FacilityMajor>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Facility__3213E83FCF0A391B");

            entity.ToTable("FacilityMajor");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CloseScheduleDate).HasColumnName("closeScheduleDate");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.FacilityId).HasColumnName("facilityId");
            entity.Property(e => e.FacilityMajorTypeId).HasColumnName("facilityMajorTypeId");
            entity.Property(e => e.IsDeactivated).HasColumnName("isDeactivated");
            entity.Property(e => e.IsOpen).HasColumnName("isOpen");
            entity.Property(e => e.MainDescription).HasColumnName("mainDescription");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.OpenScheduleDate).HasColumnName("openScheduleDate");
            entity.Property(e => e.WorkShiftsDescription).HasColumnName("workShiftsDescription");

            entity.HasOne(d => d.Facility).WithMany(p => p.FacilityMajors)
                .HasForeignKey(d => d.FacilityId)
                .HasConstraintName("FK__FacilityM__facil__5AEE82B9");

            entity.HasOne(d => d.FacilityMajorType).WithMany(p => p.FacilityMajors)
                .HasForeignKey(d => d.FacilityMajorTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FacilityM__facil__59FA5E80");
        });

        modelBuilder.Entity<FacilityMajorType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Facility__3213E83F539708AC");

            entity.ToTable("FacilityMajorType");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Feedback__3213E83F44FCEC6A");

            entity.ToTable("Feedback");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AccountId).HasColumnName("accountId");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.FacilityMajorId).HasColumnName("facilityMajorId");
            entity.Property(e => e.IsDeactivated).HasColumnName("isDeactivated");
            entity.Property(e => e.Rate).HasColumnName("rate");

            entity.HasOne(d => d.Account).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Feedback__accoun__76969D2E");

            entity.HasOne(d => d.FacilityMajor).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.FacilityMajorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Feedback__facili__778AC167");
        });

        modelBuilder.Entity<JobType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__JobType__3213E83F64704A2C");

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
            entity.HasKey(e => e.Id).HasName("PK__Report__3213E83FB24F742A");

            entity.ToTable("Report");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AccountId).HasColumnName("accountId");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.FacilityMajorId).HasColumnName("facilityMajorId");
            entity.Property(e => e.IsResolved).HasColumnName("isResolved");
            entity.Property(e => e.ReportTypeId).HasColumnName("reportTypeId");

            entity.HasOne(d => d.Account).WithMany(p => p.Reports)
                .HasForeignKey(d => d.AccountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Report__accountI__00200768");

            entity.HasOne(d => d.FacilityMajor).WithMany(p => p.Reports)
                .HasForeignKey(d => d.FacilityMajorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Report__facility__01142BA1");

            entity.HasOne(d => d.ReportType).WithMany(p => p.Reports)
                .HasForeignKey(d => d.ReportTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Report__reportTy__7F2BE32F");
        });

        modelBuilder.Entity<ReportType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ReportTy__3213E83FBF93F62E");

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
            entity.HasKey(e => e.Id).HasName("PK__RequestS__3213E83F6390300C");

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
            entity.HasKey(e => e.Id).HasName("PK__Role__3213E83FAA7B56E7");

            entity.ToTable("Role");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Service__3213E83F1C328D3F");

            entity.ToTable("Service");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CloseScheduleDate).HasColumnName("closeScheduleDate");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.FacilityMajorId).HasColumnName("facilityMajorId");
            entity.Property(e => e.IsDeactivated).HasColumnName("isDeactivated");
            entity.Property(e => e.IsInitRequestDescriptionRequired).HasColumnName("isInitRequestDescriptionRequired");
            entity.Property(e => e.IsOpen).HasColumnName("isOpen");
            entity.Property(e => e.MainDescription).HasColumnName("mainDescription");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.OpenScheduleDate).HasColumnName("openScheduleDate");
            entity.Property(e => e.RequestInitHintDescription).HasColumnName("requestInitHintDescription");
            entity.Property(e => e.ServiceTypeId).HasColumnName("serviceTypeId");
            entity.Property(e => e.WorkShiftsDescription).HasColumnName("workShiftsDescription");

            entity.HasOne(d => d.FacilityMajor).WithMany(p => p.Services)
                .HasForeignKey(d => d.FacilityMajorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Service__facilit__6EF57B66");

            entity.HasOne(d => d.ServiceType).WithMany(p => p.Services)
                .HasForeignKey(d => d.ServiceTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Service__service__6FE99F9F");
        });

        modelBuilder.Entity<ServiceAvailability>(entity =>
        {
            entity.HasKey(e => new { e.ServiceId, e.DayOfWeek, e.StartRequestableTime, e.EndRequestableTime }).HasName("PK__ServiceA__4638B5ABA1B7CC68");

            entity.ToTable("ServiceAvailability", tb => tb.HasTrigger("ValidateTimeOverlap"));

            entity.Property(e => e.ServiceId).HasColumnName("serviceId");
            entity.Property(e => e.DayOfWeek).HasColumnName("dayOfWeek");
            entity.Property(e => e.StartRequestableTime).HasColumnName("startRequestableTime");
            entity.Property(e => e.EndRequestableTime).HasColumnName("endRequestableTime");

            entity.HasOne(d => d.Service).WithMany(p => p.ServiceAvailabilities)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ServiceAv__servi__72C60C4A");
        });

        modelBuilder.Entity<ServiceRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ServiceR__3213E83F5662BAE7");

            entity.ToTable("ServiceRequest", tb => tb.HasTrigger("trg_UpdateUpdatedAt_ServiceRequest"));

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AssignedAssigneeId).HasColumnName("assignedAssigneeId");
            entity.Property(e => e.CancelReason).HasColumnName("cancelReason");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.DateRequest).HasColumnName("dateRequest");
            entity.Property(e => e.IsCancelAutomatically).HasColumnName("isCancelAutomatically");
            entity.Property(e => e.IsSeen)
                .HasDefaultValue(true)
                .HasColumnName("isSeen");
            entity.Property(e => e.ProgressNote).HasColumnName("progressNote");
            entity.Property(e => e.RequestInitDescription).HasColumnName("requestInitDescription");
            entity.Property(e => e.RequestResultDescription).HasColumnName("requestResultDescription");
            entity.Property(e => e.RequestStatusId).HasColumnName("requestStatusId");
            entity.Property(e => e.RequesterId).HasColumnName("requesterId");
            entity.Property(e => e.ServiceId).HasColumnName("serviceId");
            entity.Property(e => e.TimeRequest).HasColumnName("timeRequest");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updatedAt");

            entity.HasOne(d => d.AssignedAssignee).WithMany(p => p.ServiceRequestAssignedAssignees)
                .HasForeignKey(d => d.AssignedAssigneeId)
                .HasConstraintName("FK__ServiceRe__assig__0D7A0286");

            entity.HasOne(d => d.RequestStatus).WithMany(p => p.ServiceRequests)
                .HasForeignKey(d => d.RequestStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ServiceRe__reque__0C85DE4D");

            entity.HasOne(d => d.Requester).WithMany(p => p.ServiceRequestRequesters)
                .HasForeignKey(d => d.RequesterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ServiceRe__reque__0B91BA14");

            entity.HasOne(d => d.Service).WithMany(p => p.ServiceRequests)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ServiceRe__servi__0A9D95DB");
        });

        modelBuilder.Entity<ServiceType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ServiceT__3213E83F6A7EF4C3");

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
            entity.HasKey(e => e.Id).HasName("PK__TaskRequ__3213E83F77B2F878");

            entity.ToTable("TaskRequest", tb => tb.HasTrigger("trg_UpdateUpdatedAt_TaskRequest"));

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CancelReason).HasColumnName("cancelReason");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.FacilityMajorId).HasColumnName("facilityMajorId");
            entity.Property(e => e.RequestStatusId).HasColumnName("requestStatusId");
            entity.Property(e => e.RequesterId).HasColumnName("requesterId");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updatedAt");

            entity.HasOne(d => d.FacilityMajor).WithMany(p => p.TaskRequests)
                .HasForeignKey(d => d.FacilityMajorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TaskReque__facil__04E4BC85");

            entity.HasOne(d => d.RequestStatus).WithMany(p => p.TaskRequests)
                .HasForeignKey(d => d.RequestStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TaskReque__reque__05D8E0BE");

            entity.HasOne(d => d.Requester).WithMany(p => p.TaskRequests)
                .HasForeignKey(d => d.RequesterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TaskReque__reque__03F0984C");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
