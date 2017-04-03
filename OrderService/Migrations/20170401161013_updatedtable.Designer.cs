using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using OrderService;

namespace OrderService.Migrations
{
    [DbContext(typeof(OrderServiceContext))]
    [Migration("20170401161013_updatedtable")]
    partial class updatedtable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "1.1.1");

            modelBuilder.Entity("OrderService.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Customer");

                    b.Property<int>("Product");

                    b.Property<int>("Quantity");

                    b.HasKey("Id");

                    b.ToTable("Orders");
                });
        }
    }
}
