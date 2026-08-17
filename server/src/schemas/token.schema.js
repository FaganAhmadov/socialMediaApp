const mongoose = require("mongoose");
const tokenSchema = mongoose.Schema({ //📝Yeni schema yaradılır. Bu, MongoDB-də tokens kolleksiyasındakı sənədlərin quruluşunu müəyyən edir.
    userId: {
        type: mongoose.Schema.Types.ObjectId,            // User modelinin ID-si
        ref: 'user',                       // hansı modelə aid olduğunu göstərir
        required: true            // mütləq olmalıdır
    },
    token: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['reset', 'refresh'],
        required: true
    },
    isValid: {
        type: Boolean,
        default: true
    },
},
    { timestamps: true }
)

module.exports = tokenSchema


//Bu Token Schema istifadəçilərin reset və refresh tokenlərini MongoDB-də saxlamaq üçün yaradılıb. 
// userId tokenin sahibini,
//  token JWT dəyərini,
//  type tokenin məqsədini (reset və ya refresh),
//  isValid isə tokenin aktiv olub-olmadığını göstərir.
//  timestamps isə tokenin yaradılma və yenilənmə vaxtını avtomatik saxlayır.
//  Bu yanaşma tokenləri server tərəfdən idarə etməyə,
//  logout etməyə, reset linkini birdəfəlik etməyə və təhlükəsizliyi artırmağa imkan verir. 🔐