import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCentercode } from "@fortawesome/free-brands-svg-icons";
import {
  faUser,
  faList,
  faLocationDot,
  faGlobe,
  faStar,
  faFont,
} from "@fortawesome/free-solid-svg-icons";



function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" });
}

const UserCard = ({ userData, loading }) => {
  if (loading) {
    return (
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center text-lg font-semibold text-gray-700">
        Yükleniyor...
      </div>
    );
  }
  if (!userData || !userData.login) {
    return (
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center text-gray-500">
        Kullanıcı bilgisi bulunamadı veya arama yapılmadı.
      </div>
    );
  }

  return (
    <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-4 sm:p-5 hover:shadow-xl transition">
      {/* ÜST BÖLÜM */}
      <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={
            userData.avatar_url ||
            "https://i.pinimg.com/1200x/72/db/70/72db70ede56680e4e24c27cc742b9d69.jpg"
          }
          alt="User Profile"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border self-center sm:self-start"
        />

        <div className="flex flex-col text-center sm:text-left">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {userData.name || userData.login || "Username"}
          </h2>
          <span className="text-sm text-gray-500">
            @{userData.login || "username"}
          </span>
          <p className="text-xs text-gray-400 mt-1">
            ID: {userData.id || "-"}
          </p>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {userData.bio || "Kullanıcı henüz bir bio eklememiş."}
          </p>
        </div>
      </div>

      {/* AYIRICI */}
      <div className="my-4 border-t" />

      {/* ORTA BİLGİLER */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm text-gray-700">
        <span className="flex items-center gap-2 justify-center bg-gray-50 rounded-lg py-2 px-3">
          <FontAwesomeIcon icon={faLocationDot} className="text-gray-600" />
          <span className="hidden sm:inline">{userData.location || "Konum yok"}</span>
          <span className="sm:hidden">{userData.location || "Konum"}</span>
        </span>
        <span className="flex items-center gap-2 justify-center bg-gray-50 rounded-lg py-2 px-3">
          <FontAwesomeIcon icon={faUser} className="text-gray-600" />
          <span className="hidden sm:inline">{userData.company || "Şirket yok"}</span>
          <span className="sm:hidden">{userData.company || "Şirket"}</span>
        </span>
        <span className="flex items-center gap-2 justify-center bg-gray-50 rounded-lg py-2 px-3">
          <FontAwesomeIcon icon={faList} className="text-gray-600" />
          {userData.public_repos ?? 0} Repos
        </span>
        <span className="flex items-center gap-2 justify-center bg-gray-50 rounded-lg py-2 px-3">
          <FontAwesomeIcon icon={faCentercode} className="text-gray-600" />
          {userData.public_gists ?? 0} Gists
        </span>
      </div>

      {/* ALT LİSTE */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
        <span className="flex items-center gap-2 bg-gray-50 rounded-lg py-2 px-3">
          <FontAwesomeIcon icon={faGlobe} className="text-gray-600" />
          <a
            href={userData.html_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Profili
          </a>
        </span>
        {userData.blog && userData.blog.trim() !== "" ? (
          <span className="flex items-center gap-2 bg-gray-50 rounded-lg py-2 px-3">
            <FontAwesomeIcon icon={faGlobe} className="text-gray-600" />
            <a
              href={userData.blog.startsWith("http") ? userData.blog : `https://${userData.blog}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Web Sitesi
            </a>
          </span>
        ) : (
          <span className="flex items-center gap-2 bg-gray-50 rounded-lg py-2 px-3 text-gray-400">
            <FontAwesomeIcon icon={faGlobe} className="text-gray-300" />
            Web sitesi yok
          </span>
        )}
        {userData.twitter_username ? (
          <span className="flex items-center gap-2 bg-gray-50 rounded-lg py-2 px-3">
            <FontAwesomeIcon icon={faStar} className="text-blue-400" />
            <a
              href={`https://twitter.com/${userData.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{userData.twitter_username}
            </a>
          </span>
        ) : (
          <span className="flex items-center gap-2 bg-gray-50 rounded-lg py-2 px-3 text-gray-400">
            <FontAwesomeIcon icon={faStar} className="text-gray-300" />
            Twitter hesabı yok
          </span>
        )}
        <span className="flex items-center gap-2 bg-gray-50 rounded-lg py-2 px-3">
          <FontAwesomeIcon icon={faFont} className="text-gray-600" /> {userData.followers ?? 0} Takipçi / {userData.following ?? 0} Takip
        </span>
        <span className="flex items-center gap-2 bg-gray-50 rounded-lg py-2 px-3">
          <span className="text-xs text-gray-500">Oluşturulma: {formatDate(userData.created_at)}</span>
        </span>
        <span className="flex items-center gap-2 bg-gray-50 rounded-lg py-2 px-3">
          <span className="text-xs text-gray-500">Güncelleme: {formatDate(userData.updated_at)}</span>
        </span>
      </div>
    </div>
  );
};

export default UserCard;
