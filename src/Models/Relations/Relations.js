const Player = require("../Player")
const Medical_Data = require("../Medical_Data")
const Program = require("../Program")
const Campus = require("../Campus")
const TeamPlayer = require("../Team_Player")
const Status = require("../Status")
const Team = require("../Team")
const Sport = require("../Sport")
const Team_User = require("../Team_User")
const User = require("../User")
const Comment = require("../Comment")
const Comment_Type = require("../Comment_Type")

Status.hasMany(Player, {foreignKey: {name: 'statusId'}})
Player.belongsTo(Status, {foreignKey: {name: 'statusId'}})

Program.hasMany(Player, {foreignKey: {name: 'programId'}})
Player.belongsTo(Program, {foreignKey: {name: 'programId'}})

Campus.hasMany(Player, {foreignKey: {name: 'campusId'}})
Player.belongsTo(Campus, {foreignKey: {name: 'campusId'}})

Medical_Data.hasOne(Player, {foreignKey: {name: 'medicalDataPolicyNumber'}})
Player.belongsTo(Medical_Data, {foreignKey: {name: 'medicalDataPolicyNumber'}})

Sport.hasMany(Team, {foreignKey: {name: 'sportId'}})
Team.belongsTo(Sport, {foreignKey: {name: 'sportId'}})

Team.belongsToMany(Player, {through: TeamPlayer, foreignKey: {name: 'teamId'}})
Player.belongsToMany(Team, {through: TeamPlayer, foreignKey: {name: 'playerRegistrationNumber'}})

Team.belongsToMany(User, {through: Team_User, foreignKey: {name: 'teamId'}})
User.belongsToMany(Team, {through: Team_User, foreignKey: {name: 'userPayrollNumber'}})

Comment_Type.hasMany(Comment, {foreignKey: {name: 'commentTypeId'}})
Comment.belongsTo(Comment_Type, {foreignKey: {name: 'commentTypeId'}})

User.hasMany(Comment, {foreignKey: {name: 'userPayrollNumber'}})
Comment.belongsTo(User, {foreignKey: {name: 'userPayrollNumber'}})
Player.hasMany(Comment, {foreignKey: {name: 'playerRegistrationNumber'}})
Comment.belongsTo(Player, {foreignKey: {name: 'playerRegistrationNumber'}})
