<%@ Page Title="test123" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="HomePage.aspx.cs" Inherits="HomePage" %>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">

        <div class="clear hideSkiplink">
            <asp:Menu ID="NavigationMenu" runat="server" CssClass="menu" EnableViewState="false" IncludeStyleBlock="false" Orientation="Horizontal">
                <Items>
                    <asp:MenuItem NavigateUrl="~/HomePage.aspx" Text="Home"/>                    
                    <asp:MenuItem NavigateUrl="~/Training_Code/TrainingReport.aspx" Text="Triathlon Training Log"/>
                    <asp:MenuItem NavigateUrl="http://joeboman.com/Default.aspx" target="_blank" Text="Murray Casings Converted to ASP.Net"/>
                    <asp:MenuItem NavigateUrl="http://www.orioncalls.com" target="_blank" Text="Orion Game Calls"/>
                    <asp:MenuItem NavigateUrl="http://www.ixtapaofshawnee.com/" target="_blank" Text="Ixtapa Restaurant"/>
                </Items>
            </asp:Menu>
        </div>
</asp:Content>

<asp:Content ID="BodyContent" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <p style="margin:0;text-align: center;font-size: x-large;">
         Welcome to the Home page
<%--        <span id="hideshowdiv" style="text-align: center;font-size: small;" >hover mouse here for page explanation</span>--%>

    
            <div >
            <asp:Menu ID="Menu1" runat="server" CssClass="" EnableViewState="false" IncludeStyleBlock="false" Orientation="Vertical" RenderingMode="List">
                <Items>
                    <asp:MenuItem NavigateUrl="~/HomePage.aspx" Text="Home" />                    
                    <asp:MenuItem NavigateUrl="~/Training_Code/TrainingReport.aspx" Text="Triathlon Training Log - C# ASP.Net Webforms framework application.  Includes the following technologies: HTML, CSS, SQL, jQuery MSSQL Server database created/deployed using T-SQL script  "/>
                    <asp:MenuItem NavigateUrl="http://joeboman.com/Default.aspx" target="_blank" Text="Murray Casings current site Converted to ASP.Net with more representative looking photos of the prairie"/>

                    <asp:MenuItem NavigateUrl="http://www.orioncalls.com" target="_blank" Text="Orion Game Calls PHP website with custom Content Management design"/>
                    <asp:MenuItem NavigateUrl="http://www.ixtapaofshawnee.com/" target="_blank" Text="Ixtapa Restaurant - local restaurant static site"/>
                </Items>
            </asp:Menu>
        </div>


</asp:Content>

