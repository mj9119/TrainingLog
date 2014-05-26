using System;
using System.Configuration;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for WorkoutObjectDB
/// </summary>
[DataObject]
public class WorkoutObjectDB
{
    [DataObjectMethod(DataObjectMethodType.Select)]
    public static IEnumerable GetWorkoutTypes(string userEmail)
    {
        SqlConnection con = new SqlConnection(GetConnectionString());
        string sel =
            "SELECT TypeOfWorkout " +
            "FROM WorkoutType " +
            "WHERE UserEmail = @UserEmail " ;
        SqlCommand cmd = new SqlCommand(sel, con);
        if (userEmail == null)
            userEmail = "";
        cmd.Parameters.AddWithValue("@UserEmail", userEmail);
        con.Open();
        SqlDataReader rdr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
        return rdr;
    }

    [DataObjectMethod(DataObjectMethodType.Update)]
    public static int UpdateWorkoutDay(DailyWorkout thisDaysWorkout)
    {
        SqlConnection con = new SqlConnection(GetConnectionString());
        string up = "UPDATE TrainingLog SET" 
            + " TypeOfWorkout = @TypeOfWorkout, "
            + " TotalMilesRun = @TotalMilesRun, "
            + " QualityMilesRun = @QualityMilesRun, "
            + " TotalMinsBike = @TotalMinsBike, "
            + " TotalMinsSwim = @TotalMinsSwim, "
            + " WorkoutDescription = @WorkoutDescription"
            + " WHERE UserEmail = @UserEmail "
            + " AND   CalendarDate = @CalendarDate"
            ;
        
        SqlCommand cmd = new SqlCommand(up, con);
        cmd.Parameters.AddWithValue("UserEmail", thisDaysWorkout.UserEmail);
        cmd.Parameters.AddWithValue("CalendarDate", thisDaysWorkout.TrainingDate);
        cmd.Parameters.AddWithValue("TypeOfWorkout", thisDaysWorkout.WorkoutType);
        cmd.Parameters.AddWithValue("TotalMilesRun", thisDaysWorkout.TotalMilesRun);
        cmd.Parameters.AddWithValue("QualityMilesRun", thisDaysWorkout.QualityMilesRun);
        cmd.Parameters.AddWithValue("TotalMinsBike", thisDaysWorkout.BikeMins);
        cmd.Parameters.AddWithValue("TotalMinsSwim", thisDaysWorkout.SwimMins);
        cmd.Parameters.AddWithValue("WorkoutDescription", thisDaysWorkout.OverallWorkoutDescription);
        con.Open();
        int updateCount = cmd.ExecuteNonQuery();
        con.Close();
        return updateCount;
    }


    [DataObjectMethod(DataObjectMethodType.Insert)]
    public static int InsertWorkoutType(WorkoutType thisWorkoutInsert)
    {
        SqlConnection con = new SqlConnection(GetConnectionString());
        string ins =
            "INSERT into WorkoutType " +
            " (UserEmail, TypeOfWorkout) " +
            " VALUES (@UserEmail, @TypeOfWorkout)";
        SqlCommand cmd = new SqlCommand(ins, con);
        cmd.Parameters.AddWithValue("UserEmail", thisWorkoutInsert.UserEmail);
        cmd.Parameters.AddWithValue("TypeOfWorkout", thisWorkoutInsert.TypeOfWorkout);
        con.Open();
        int i = cmd.ExecuteNonQuery();
        con.Close();
        return i;
    }

    [DataObjectMethod(DataObjectMethodType.Insert)]
    public static int InsertWorkoutDay(DailyWorkout thisDaysWorkout)
    {
        SqlConnection con = new SqlConnection(GetConnectionString());
        string ins =
            "INSERT into TrainingLog " +
            " (UserEmail, CalendarDate, TypeOfWorkout, TotalMilesRun, QualityMilesRun, TotalMinsBike, TotalMinsSwim, WorkoutDescription) " +
            " VALUES (@UserEmail, @CalendarDate, @TypeOfWorkout, @TotalMilesRun, @QualityMilesRun, @TotalMinsBike, @TotalMinsSwim, @WorkoutDescription)";
        SqlCommand cmd = new SqlCommand(ins, con);
        cmd.Parameters.AddWithValue("UserEmail", thisDaysWorkout.UserEmail);
        cmd.Parameters.AddWithValue("CalendarDate", thisDaysWorkout.TrainingDate);
        cmd.Parameters.AddWithValue("TypeOfWorkout", thisDaysWorkout.WorkoutType);
        cmd.Parameters.AddWithValue("TotalMilesRun", thisDaysWorkout.TotalMilesRun);
        cmd.Parameters.AddWithValue("QualityMilesRun", thisDaysWorkout.QualityMilesRun);
        cmd.Parameters.AddWithValue("TotalMinsBike", thisDaysWorkout.BikeMins);
        cmd.Parameters.AddWithValue("TotalMinsSwim", thisDaysWorkout.SwimMins);
        cmd.Parameters.AddWithValue("WorkoutDescription", thisDaysWorkout.OverallWorkoutDescription);
        con.Open();
        int i = cmd.ExecuteNonQuery();
        con.Close();
        return i;
    }

    private static string GetConnectionString()
    {
        return ConfigurationManager.ConnectionStrings[
            "TrainingConnectionString"].ConnectionString;
    }
}