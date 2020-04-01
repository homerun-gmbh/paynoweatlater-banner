# #PayNowEatLater JavaScript Banner

Das #PayNowEatLater-Banner wird mit Jekyll gemanagt und kann dadurch
auch lokal getestet werden. Hierfür wird eine aktuelle Ruby-Version (z. B. 
Ruby 2.6.5) mit installiertem Bundler-Gem benötigt.

Sind Ruby und Bundler installiert, können die Dependencies können mit 
`bundle install` installiert werden. Ein Webserver wird mit 
`bundle exec jekyll serve --livereload` gestartet.

→ Aktuell ist Jekyll so konfiguriert, dass die Seite von einem
Unterverzeichnis aus gehostet wird. Die lokale URL zum Testen ist also
nicht `http://127.0.0.1:4000`, sondern
`http://127.0.0.1:4000/paynoweatlater-banner/`
