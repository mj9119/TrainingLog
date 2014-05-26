using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for DailyWorkout
/// </summary>
public class DailyWorkout
{
    public DailyWorkout()
    {
        //
        // TODO: Add constructor logic here
        //
    }
    public string insertOrUpdateFlag { get; set; }

    public string   WorkoutType { get; set; }
    public DateTime TrainingDate { get; set; }
    public string   UserEmail { get; set; }
    
    // both MilesRun fields are simply stored in Session var as strings 
    // instead of type double 
    // because when no value entered or non-numeric entered, 
    // processing expects a number and blows up
    public string TotalMilesRun { get; set; }
    public string QualityMilesRun { get; set; }
    
    //public string BikeHrs { get; set; }
    public string BikeMins { get; set; }

    //public string SwimHrs { get; set; }
    public string SwimMins { get; set; }
    
    public string OverallWorkoutDescription { get; set; }
}