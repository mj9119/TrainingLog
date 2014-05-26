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
/// Summary description for WorkoutDB
/// </summary>
public class WorkoutDB
{
	public WorkoutDB()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public static DailyWorkout RetrieveScreenFields(DateTime screenDate, string currUserEmail)
    {
        DailyWorkout myDailyWorkout = new DailyWorkout();
        string dateModified = screenDate.ToString("MM/dd/yyyy");
        
        SqlConnection con = new SqlConnection(GetConnectionString());

        string sel =
            "SELECT UserEmail, CalendarDate, TypeOfWorkout, " +
                     "TotalMilesRun, QualityMilesRun, " +
                     "TotalMinsBike, TotalMinsSwim, WorkoutDescription " +
            "FROM  TrainingLog " +
            "WHERE UserEmail = @UserEmail " +
            "AND   CalendarDate = @CalendarDate ";

        SqlCommand cmd = new SqlCommand(sel, con);
        cmd.Parameters.AddWithValue("@UserEmail", currUserEmail);
        cmd.Parameters.AddWithValue("@CalendarDate", dateModified);
        con.Open();

        //rdr.GetSqlString();        
        SqlDataReader rdr = cmd.ExecuteReader(CommandBehavior.CloseConnection);

        //if the row exists flag it for update
        if (rdr.HasRows)
        {
            myDailyWorkout.insertOrUpdateFlag = "Update";
            while (rdr.Read())
            {
                myDailyWorkout.WorkoutType = rdr["TypeOfWorkout"].ToString();
                string dateString = rdr["CalendarDate"].ToString();
                myDailyWorkout.TrainingDate = Convert.ToDateTime(dateString);
                myDailyWorkout.UserEmail = rdr["UserEmail"].ToString();
                myDailyWorkout.TotalMilesRun = rdr["TotalMilesRun"].ToString();
                myDailyWorkout.QualityMilesRun = rdr["QualityMilesRun"].ToString();
                myDailyWorkout.BikeMins = rdr["TotalMinsBike"].ToString();
                myDailyWorkout.SwimMins = rdr["TotalMinsSwim"].ToString();
                myDailyWorkout.OverallWorkoutDescription = rdr["WorkoutDescription"].ToString();
            }
        }
        else
        {
            myDailyWorkout.insertOrUpdateFlag = "Insert";
            myDailyWorkout.TrainingDate = screenDate;
            myDailyWorkout.UserEmail = currUserEmail;
            myDailyWorkout.TotalMilesRun = "0";
            myDailyWorkout.QualityMilesRun = "0";
            myDailyWorkout.BikeMins = "0";
            myDailyWorkout.SwimMins = "0";
            myDailyWorkout.OverallWorkoutDescription = "";
        }

        
        rdr.Close();        
        return myDailyWorkout;
    }

    private static string GetConnectionString()
    {
        return ConfigurationManager.ConnectionStrings[
            "TrainingConnectionString"].ConnectionString; 
    }
}