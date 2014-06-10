<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="TrainingReport.aspx.cs" Inherits="TrainingReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <style type="text/css">
        .style1
        {
            width: 100%;
            border: 1px solid #4b6c9e;
        }
        .style4
        {
            width: 100%;
        }      
        </style>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">

        <div class="clear hideSkiplink">
            <asp:Menu ID="NavigationMenu" runat="server" CssClass="menu" EnableViewState="false" IncludeStyleBlock="false" Orientation="Horizontal">
                <Items>
                    <asp:MenuItem NavigateUrl="~/HomePage.aspx" Text="Home"/>
                    <asp:MenuItem NavigateUrl="~/Training_Code/TrainingReport.aspx" Text="Training Report"/>
                    <asp:MenuItem NavigateUrl="~/Training_Code/EnterLog.aspx" Text="Training Updates"/>
                    <asp:MenuItem NavigateUrl="~/Training_Code/UpdateWorkoutType.aspx" Text="Add New Workout Type"/>
                    <asp:MenuItem NavigateUrl="https://github.com/mj9119/TrainingLog" target="_blank" Text="Source Code on GitHub"/>
                </Items>
            </asp:Menu>
        </div>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    <p style="margin:0;text-align: center;font-size: x-large;">
         Training Report
        <span id="hideshowdiv" style="text-align: center;font-size: small;" >hover mouse here for page explanation</span>
    </p>

    <script type="text/javascript" >
        $(document).ready(function () {
            $("#hideshowdiv").mouseenter(function () {
                $("div.mydiv").show(true, true);
                $("div.mydiv").animate({ right: '250px', opacity: '1.00' }, 1000);
                $("div.mydiv").animate({ fontSize: '1.02em', fontWeight: 'bold' }, 1000);
            });

            $("#hideshowdiv").mouseleave(function () {
                $("div.mydiv").hide(true, true);
            });
        });   
    </script>
    
    <div class="mydiv" style="background:#98bf21;height:550px;width:430px;position:absolute;display:none;">
       </br><span style="font-weight:bold;"> Page Explanation:</span>
       </br>The Training Report details the most recent two weeks of daily training activity for the person who is logged in.
       </br>To change the date range of the report, click a Calendar date button or buttons and choose a different date or dates. 
       </br>End Date must be greater than or equal to Start Date.
       </br>To Add or Change training information on this report, please choose "Training Updates" from the Menu.
       </br><span style="font-weight:bold;"> Technical Summary:</span>
       </br>Date field validation on this Page combines the use of the ASP.NET RequiredFieldValidator and CompareValidator controls.
       </br>The Training Report is created using the DataList ASP.NET control bound to an SqlDataSource control.
       </br>The SqlDataSource control utilizes a Connection String to access the database.
       </br>The data is retrieved from the "TrainingLog" SQL Server table within a database named "Training".
       </br>Report fields on this page are defined using Header and Item templates.
       </br>Note: Other data access examples on this Site separate the SQL from the Presentation Layer using object data sources.
       </br>
       </br>Note: when the user hovers their mouse asking for a page explanation, Jquery animates this explanation over the screen without interrupting or re-rendering any current page content.
       </br>The Jquery runtime Content Delivery Network (CDN) is coded within the Site.Master page.
       </br>For additional technical detail, this site's code is viewable online.  Please see the "Source Code on GitHub" menu link.
    </div>

<%--        <h3 style="text-align:center"> <asp:Label ID="lblPageMessage" runat="server" 
            Visible="False"></asp:Label>  </h3>  --%>  
<p>Start Date:
    <asp:TextBox ID="txtStart" runat="server" CausesValidation="True"></asp:TextBox> 
    <asp:ImageButton ID="ibtnStart"
        runat="server" ImageUrl="~/Images/Calendar.bmp" 
        onclick="ibtnStart_Click" CausesValidation="False" />

    <asp:RequiredFieldValidator ID="rfvStartDate" runat="server" 
        ControlToValidate="txtStart" 
        ErrorMessage=" Date is Required.  Must be in MM/DD/YYYY format" 
        ForeColor="#CC3300">
    </asp:RequiredFieldValidator>
    <br />
    <asp:CompareValidator ID="cvStartDate" runat="server" 
        ControlToValidate="txtStart" ErrorMessage="You must enter  a valid Start date" 
        ForeColor="#CC3300" Operator="DataTypeCheck" Type="Date" ValidationGroup="cvStartDateGRP">
    </asp:CompareValidator>

    <asp:Calendar ID="clnStart" runat="server" Visible="False" 
        onselectionchanged="clnStart_SelectionChanged">
    </asp:Calendar>

    
    <asp:CompareValidator ID="CompareValidator1" runat="server" 
        ErrorMessage="End Date must be greater than Start Date" 
        ControlToValidate="txtEnd" Operator="GreaterThanEqual" Type="Date" 
        ControlToCompare="txtStart" ForeColor="#CC3300"></asp:CompareValidator>
</p>

<p>   End&nbsp;&nbsp;Date:
    <asp:TextBox ID="txtEnd" runat="server" CausesValidation="True"></asp:TextBox> 
    <asp:ImageButton ID="ibtnEnd"
        runat="server" ImageUrl="~/Images/Calendar.bmp" onclick="ibtnEnd_Click" 
        CausesValidation="False" />
    
        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" 
        ControlToValidate="txtEnd" 
        ErrorMessage=" Date is Required.  Must be in MM/DD/YYYY format" 
        ForeColor="#CC3300">
    </asp:RequiredFieldValidator>
    <br />
    <asp:CompareValidator ID="CompareValidator2" runat="server" 
        ControlToValidate="txtEnd" ErrorMessage="You must enter  a valid End date" 
        ForeColor="#CC3300" Operator="DataTypeCheck" Type="Date" ValidationGroup="CompareValidator2GRP">
    </asp:CompareValidator>
    
    <asp:Calendar ID="clnEnd" runat="server" Visible="False" 
        onselectionchanged="clnEnd_SelectionChanged">
    </asp:Calendar>
</p>

<div>
    <p>
        <asp:DataList ID="DataList1" runat="server" DataSourceID="SqlDataSource3">
            <HeaderTemplate>
            
                <table class="style4">
                <tr>
                    <td style="width: 110px;font-weight:bold;"> Calendar<br />Date
                    </td>
                    <td style="width: 170px;font-weight:bold;">Workout<br />Type
                    </td>
                    <td style="width: 100px;font-weight:bold;">Total
                        <br />
                        Miles Run
                    </td>
                    <td style="width: 100px;font-weight:bold;">Quality
                        <br />
                        Miles Run
                    </td>
                    <td style="width: 100px;font-weight:bold;">Total
                        <br />
                        Mins Bike
                    </td>
                    <td style="width: 325px;font-weight:bold;">Total
                        <br />
                        Mins Swim
                    </td>
                </tr>
                </table>

            </HeaderTemplate>
            <ItemTemplate>

                <table class="style1">
                    <tr>
                        <td style="width: 108px">
                            <asp:Label ID="CalendarDateLabel0" runat="server" 
                                Text='<%# Eval("CalendarDate", "{0:d}") %>' />
                        </td>
                        <td style="width: 171px">
                            <asp:Label ID="TypeOfWorkoutLabel0" runat="server" 
                                Text='<%# Eval("TypeOfWorkout") %>' />
                        </td>
                        <td style="width: 100px">
                            <asp:Label ID="TotalMilesRunLabel0" runat="server" 
                                Text='<%# Eval("TotalMilesRun") %>' />
                        </td>
                        <td style="width: 100px">
                            <asp:Label ID="QualityMilesRunLabel0" runat="server" 
                                Text='<%# Eval("QualityMilesRun") %>' />
                        </td>
                        <td style="width: 100px">
                            <asp:Label ID="TotalMinsBikeLabel0" runat="server" 
                                Text='<%# Eval("TotalMinsBike") %>' />
                        </td>
                        <td style="width: 250px">
                            <asp:Label ID="TotalMinsSwimLabel0" runat="server" 
                                Text='<%# Eval("TotalMinsSwim") %>' />
                        </td>
                        <td>
                            &nbsp;</td>

                    </tr>
                    <tr>
                        <td colspan="7"> <span style="font-weight:bold">WorkoutDescription: </span>
                            <asp:Label ID="WorkoutDescriptionLabel0" runat="server" 
                                Text='<%# Eval("WorkoutDescription") %>' />
                        </td>
                    </tr>
                </table>
<br />
            </ItemTemplate>
        </asp:DataList>

        <asp:SqlDataSource ID="SqlDataSource3" runat="server" 
            ConnectionString="<%$ ConnectionStrings:TrainingConnectionString %>"                       
            
            SelectCommand="SELECT [CalendarDate], [TypeOfWorkout], [TotalMilesRun], [QualityMilesRun], [TotalMinsBike], [TotalMinsSwim], [WorkoutDescription] FROM [TrainingLog] WHERE (([CalendarDate] &lt;= @CalendarDate) AND ([CalendarDate] &gt;= @CalendarDate2) AND ([UserEmail] = @UserEmail)) ORDER BY [CalendarDate] DESC">
            <SelectParameters>
                <asp:ControlParameter ControlID="txtEnd" DbType="Date" Name="CalendarDate" 
                    PropertyName="Text" />
                <asp:ControlParameter ControlID="txtStart" DbType="Date" Name="CalendarDate2" 
                    PropertyName="Text" />
                <asp:ControlParameter ControlID="lblLoggedInUser" Name="UserEmail" 
                    PropertyName="Text" Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>

     Report Footer <br />
    </p>
        <p style="text-align:center"> <asp:Label ID="lblLoggedInUser" runat="server" 
            Visible="False"></asp:Label>  </p>  
</div>

</asp:Content>

